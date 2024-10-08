import { Request, Response, NextFunction } from "express";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import ServerException from "../../exceptions/ServerException";
import NotFoundException from "../../exceptions/NotFoundException";
import Order from "../model/Order";
import OrderTransformer from "./Transformer";
import OrderService from "../OrderService";


class OrdersController {
  private readonly ordersRepository: IOrderRepository
  private readonly orderTransformer: OrderTransformer
  private readonly orderService: OrderService

  constructor(){
    this.ordersRepository = new OrderMongoRepository()
    this.orderTransformer = new OrderTransformer()
    this.orderService = new OrderService()

    this.index = this.index.bind(this)
    this.find = this.find.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const page = req.query.page || 1
      const itemsPerPage = 10
      const offset = (page as number - 1) * itemsPerPage
     
      const orders = await this.ordersRepository.findByUserDetails({
        firstName: req.query.keyword as string,
        lastName: req.query.keyword as string,
        email: req.query.keyword as string
      }, ['user', 'coupon'], {itemsPerPage, offset})
      
      const totalOrders = await this.ordersRepository.findByUserDetails({
        firstName: req.query.keyword as string,
        lastName: req.query.keyword as string,
        email: req.query.keyword as string
      })
     
      res.send({
        date: this.orderTransformer.collection(orders),
        _metadata: {
          page,
          perPage: itemsPerPage,
          totalPages: Math.ceil(totalOrders.length / itemsPerPage),
          totalItems: totalOrders.length
        }
      })
    } catch (error: any) {
      next(error.message)
    }
  }

  public async create(red: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newOrderParams = {
        user: '66ba4a6e4bb4b33f2cc2a817',
        totalPrice: 101000000,
        finalPrice: 950000101,
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

  public async find(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const orderId = req.params.orderID
      if(orderId.length !== 24){
        throw new NotFoundException('order not found') 
      }
      const order = await this.ordersRepository.findOne(orderId, ['user', 'coupon'])
      if(!order){
        throw new NotFoundException('order not found') 
      }
      res.send(this.orderTransformer.transform(order))
    } catch (error: any) {
      next(error)
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>{
    this.orderService.updateStatus(req.params.orderID, req.body.orderStatus)
    .then((result) => {
      if(result){
        res.send({success: true, message: 'successfully update status'})
      }
    })
    .catch((error) => next(error))
  }
}

export default OrdersController