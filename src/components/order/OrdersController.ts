import { Request, Response, NextFunction } from "express";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import ServerException from "../exceptions/ServerException";
import NotFoundException from "../exceptions/NotFoundException";
import Order from "./model/Order";
import OrderTransformer from "./OrderTransformer";


class OrdersController {
  private readonly ordersRepository: IOrderRepository
  private readonly orderTransformer: OrderTransformer
  constructor(){
    this.ordersRepository = new OrderMongoRepository()
    this.orderTransformer = new OrderTransformer()
    this.index = this.index.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const page = req.query.page || 1
      const itemsPerPage = 10
      const offset = (page as number - 1) * itemsPerPage
      const orders = await this.ordersRepository.findMany({}, ['user', 'coupon'], {itemsPerPage, offset})
      const totalOrders = await this.ordersRepository.findMany({})
      res.send({
        date: this.orderTransformer.collection(orders),
        _metadata: {
          page,
          per_page: itemsPerPage,
          total_pages: Math.ceil(totalOrders.length / itemsPerPage),
          total_items: totalOrders.length
        }
      })
    } catch (error: any) {
      next(error)
    }
  }

  public async create(red: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newOrderParams = {
        user: '66d83c045b7dbae85dda0728',
        totalPrice: 1000000,
        finalPrice: 950000,
        orderLines: [{
          product: '66d035bd9f8a07e2a6ae6529',
          price: 1000000,
          discountedPrice: 0,
          count: 1,
          createdAt: Date.now()
        }],
        coupon: '66d98f8c5a535c517b2d186e',
        deliveryAddress: {
          title: 'home',
          state: 'kermanshah',
          city: 'kangavar',
          address: 'anahita11',
          zipCode: 1010101,
          fullName: 'ashkan',
          mobile: '090000000'
        }
      }
      const newOrder = await Order.create(newOrderParams)
      res.send(newOrder)
    } catch (error) {
      next(error)
    }
  }
}

export default OrdersController