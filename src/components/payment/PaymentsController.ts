import { Request, Response, NextFunction } from "express";
import IPaymentRepository from "./repositories/IPaymentRepository";
import PaymentMongoRepository from "./repositories/PaymentMongoRepository";

class PaymentsController {
  private readonly paymentRepository: IPaymentRepository

  constructor(){
    this.paymentRepository = new PaymentMongoRepository()
  }

}

export default PaymentsController