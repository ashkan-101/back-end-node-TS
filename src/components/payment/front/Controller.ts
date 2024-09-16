import { Request, Response, NextFunction } from "express";
import IPaymentRepository from "../repositories/IPaymentRepository";
import PaymentMongoRepository from "../repositories/PaymentMongoRepository";
import onlineGateWays from '../../../config/gateWays'


class PaymentsController {
  private readonly paymentRepository: IPaymentRepository

  constructor(){
    this.paymentRepository = new PaymentMongoRepository()

    this.gateWaysList = this.gateWaysList.bind(this)
  }

  public async gateWaysList(req: Request, res: Response, next: NextFunction){
    try {
      res.send({
        success: true,
        onlineGateWays
      })
    } catch (error) {
      res.send({
        success: false,
        message: 'deactive gateWays! '
      })
    }
  }
}

export default PaymentsController