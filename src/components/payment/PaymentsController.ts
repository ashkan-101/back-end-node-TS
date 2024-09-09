import { Request, Response, NextFunction } from "express";
import IPaymentRepository from "./repositories/IPaymentRepository";
import PaymentMongoRepository from "./repositories/PaymentMongoRepository";
import Order from "../order/model/Order";
import IOrderRepository from "../order/repositories/IOrderRepository";
import OrderMongoRepository from "../order/repositories/OrderMongoRepository";

class PaymentsController {
  private readonly paymentRepository: IPaymentRepository
  private readonly orderRepository: IOrderRepository

  constructor(){
    this.paymentRepository = new PaymentMongoRepository()
    this.orderRepository = new OrderMongoRepository()
    
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction){
    try {
      const payments = await this.paymentRepository.findMany({}, ['user', 'order'])
      res.send(payments)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction){
    const order = await this.orderRepository.findOne(req.body.order)

    const newPaymentParams = {
      user: req.body.user,
      order: req.body.order,
      amount: order?.finalPrice,
      methos: 'online',
      reserve: Math.random().toString(16),
      refrence: Math.random().toString(16),
    }

    const newPayment = await this.paymentRepository.create(newPaymentParams)
    console.log(newPayment);
    res.send({
      success: true,
      newPayment
    })
  }
}

export default PaymentsController