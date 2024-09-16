import ITransformer from "../../contracts/ITransformer";
import DateService from "../../../services/DateService";
import IPayment from "../model/IPayment";

export default class PaymentTransformer implements ITransformer<IPayment>{
  private readonly dateService: DateService

  constructor(){
    this.dateService = new DateService()
  }
  
  public transform(item: IPayment){
    return {
      id: item._id,
      user: this.getUser(item.user),
      order: this.getOrder(item.order),
      amount: item.amount,
      method: item.method,
      reserve: item.reserve,
      refrence: item.refrence,
      createdAt: this.dateService.toPersian(item.createdAt.toUTCString()),
      updatedAt: this.dateService.toPersian(item.updatedAt.toUTCString()),
      status: item.status
    }
  }

  public collection(items: IPayment[]){
    return items.map((item: IPayment) => this.transform(item))
  }

  private getUser(user: any){
    if(!user){ return null }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id
    }
  }

  private getOrder(order: any) {
    if(!order){ return null }
    return { 
      id: order._id,
      totalPrice: order.totalPrice,
      finalPrice: order.finalPrice,
      orderLines: order.orderLines
    }
  }
}

