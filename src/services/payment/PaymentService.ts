import IOrder from "../../components/order/model/IOrder";
import IPaymentRepository from "../../components/payment/repositories/IPaymentRepository";
import PaymentMongoRepository from "../../components/payment/repositories/PaymentMongoRepository";
import { hashFromUUID } from "../HashService";
import OnlinePayment from "./methods/OnlinePayment";
import PaymentMethodFactory from "./PaymentMethodFactory";

export default class PaymentService {
  private readonly paymentRepository: IPaymentRepository
  private readonly paymentMethodFactory: PaymentMethodFactory

  constructor(){
    this.paymentRepository = new PaymentMongoRepository()
    this.paymentMethodFactory = new PaymentMethodFactory()
  }
  
  public async payOrder(order: IOrder, method: string){
    const newPayment = await this.paymentRepository.create({
      user: order.user,
      order: order._id,
      amount: order.finalPrice,
      methos: method,
      reserve: hashFromUUID(),
    })
    
    const paymentProvider = this.paymentMethodFactory.make('online')
    if(paymentProvider instanceof OnlinePayment){
      paymentProvider.setGateway(method)
    }
    const result = await paymentProvider.doPayment(order)
    return result
  }
}