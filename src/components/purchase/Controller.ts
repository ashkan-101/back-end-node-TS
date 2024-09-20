import { Request, Response, NextFunction } from "express";
import OrderService from "../order/OrderService";
import ServerException from "../exceptions/ServerException";
import IAddOrderData from "../order/IAddOrderData";
import PaymentService from '../../services/payment/PaymentService'
import IOrder from "../order/model/IOrder";
import IPaymentRepository from "../payment/repositories/IPaymentRepository";
import PaymentMongoRepository from "../payment/repositories/PaymentMongoRepository";


class OrdersController {
  private readonly orderService: OrderService
  private readonly paymentService: PaymentService
  private readonly paymentRepository: IPaymentRepository
  
  constructor(){
    this.orderService = new OrderService()
    this.paymentService = new PaymentService()
    this.paymentRepository = new PaymentMongoRepository()

    this.purchaseOrder = this.purchaseOrder.bind(this)
    this.verifyPayment = this.verifyPayment.bind(this)
  }

  public async purchaseOrder(req: Request, res: Response, next: NextFunction){
    try {
      const orderData: IAddOrderData = {
        userId: req.userId as string, 
        items: [...req.body.basket],
        coupon: req.body.coupon,
        deliveryAddress: req.body.deliveryAddress,
      }

      const newOrder = await this.orderService.addOrder(orderData)
      if(!newOrder){
        throw new ServerException('درحال حاظر امکان ثبت سفارش وجود ندارد!')
      }

      const paymentResult = await this.paymentService.payOrder(newOrder as IOrder, req.body.paymentMethod)
      res.status(201).send({
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }

  public async verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const paymentData = {
        authority: req.body.authority,
        status: req.body.status,
        reserve: req.body.reserve
      }

      const paymentVerifyResult = await this.paymentService.verifyPayment(paymentData)
      if(paymentVerifyResult.success){
        const payment = await this.paymentRepository.findByReserve(paymentData.reserve)
        this.orderService.completeOrder(payment?.order as string )
      }
      res.send(paymentVerifyResult)
    } catch (error) { 
      next(error)
    }
  }
}

export default OrdersController