import { Request, Response, NextFunction } from "express";
import OrderService from "../OrderService";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import ServerException from "../../exceptions/ServerException";
import NotFoundException from "../../exceptions/NotFoundException";
import IAddOrderData from "../IAddOrderData";


class OrdersController {
  private readonly ordersRepository: IOrderRepository
  private readonly orderService: OrderService
  
  constructor(){
    this.ordersRepository = new OrderMongoRepository()
    this.orderService = new OrderService()

    this.store = this.store.bind(this)
  }

  public async store(req: Request, res: Response, next: NextFunction){
    console.log(req.body);
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
      res.status(201).send({
        success: true,
        newOrder
      })
    } catch (error) {
      next(error)
    }
  }
}

export default OrdersController