import { Request, Response, NextFunction } from "express";
import IPaymentRepository from "./repositories/IPaymentRepository";
import PaymentMongoRepository from "./repositories/PaymentMongoRepository";

class PaymentsController {
  private readonly paymentRepository: IPaymentRepository

  constructor(){
    this.paymentRepository = new PaymentMongoRepository()
    this.index = this.index.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction){
    try {
      const payments = await this.paymentRepository.findMany({})
      res.send(payments)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction){
    
    const newPayment = {
      user: req.body.user,
      order: req.body.order,
      amount: 25,
      methos: 'online',
      reserve: '',
      refrence: '',
  }

  }
}

export default PaymentsController