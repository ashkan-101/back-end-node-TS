import { Request, Response, NextFunction } from "express";
import OrderService from "../OrderService";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import ServerException from "../../exceptions/ServerException";
import NotFoundException from "../../exceptions/NotFoundException";
import IAddOrderData from "../IAddOrderData";
import Transformer from './Transformer'
import ITransformer from "../../contracts/ITransformer";
import IOrder from "../model/IOrder";


class OrdersController {
  private readonly ordersRepository: IOrderRepository
  private readonly orderService: OrderService
  private readonly transformer: ITransformer<IOrder>
  
  constructor(){
    this.ordersRepository = new OrderMongoRepository()
    this.orderService = new OrderService()
    this.transformer = new Transformer()

    this.store = this.store.bind(this)
    this.list = this.list.bind(this)
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void>{
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

  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
    const userId = req.userId
    const userOrders = await this.ordersRepository.findMany({user : userId})

    res.status(200).send({
      success: true,
      orders: this.transformer.collection(userOrders)
    })
    
   } catch (error) {
    next(error)
   }
  }
}

export default OrdersController