import { Request, Response, NextFunction } from "express";
import IPaymentRepository from "../repositories/IPaymentRepository";
import PaymentMongoRepository from "../repositories/PaymentMongoRepository";
import IOrderRepository from "../../order/repositories/IOrderRepository";
import OrderMongoRepository from "../../order/repositories/OrderMongoRepository";
import PaymentTransformer from "./Transformer";
import ITransformer from "../../contracts/ITransformer";
import IPayment from "../model/IPayment";

class PaymentsController {
  private readonly paymentRepository: IPaymentRepository
  private readonly orderRepository: IOrderRepository
  private readonly paymentTransformer: ITransformer<IPayment>

  constructor(){
    this.paymentRepository = new PaymentMongoRepository()
    this.orderRepository = new OrderMongoRepository()
    this.paymentTransformer = new PaymentTransformer()
    
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction){
    try {
      const payments = await this.paymentRepository.findMany({}, ['user', 'order'])
      const paymentTransform = this.paymentTransformer.collection(payments)

      res.send(paymentTransform)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction){
    try {
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
      res.send(newPayment)
    } catch (error) {
      next(error)
    }
  }
}

export default PaymentsController