import { Request, Response, NextFunction } from "express";
import OrderService from "../OrderService";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import ServerException from "../../exceptions/ServerException";
import NotFoundException from "../../exceptions/NotFoundException";


class OrdersController {
  private readonly ordersRepository: IOrderRepository
  private readonly orderService: OrderService
  
  constructor(){
    this.ordersRepository = new OrderMongoRepository()
    this.orderService = new OrderService()

    this.store = this.store.bind(this)
  }

  public async store(req: Request, res: Response, next: NextFunction){
    try {
      const orderData = {
        userId: req.userId,
        items: [req.body.basket],
        coupon: req.body.coupon,
        delivaryAddress: req.body.delivaryAddress,
        paymentMethod: req.body.paymentMethod
      }

      const result = await this.orderService.addOrder(orderData)
    } catch (error) {
      next(error)
    }
  }
}

export default OrdersController