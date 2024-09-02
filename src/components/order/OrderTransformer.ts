import ITransformer from "../contracts/ITransformer";
import IOrder from "./model/IOrder";
import DateService from "../../services/DateService";
import ICoupon from "../coupon/model/ICoupen";

export default class OrderTransformer implements ITransformer<IOrder> {
  private readonly dateService: DateService

  constructor(){
    this.dateService = new DateService()
  }

  transform(item: IOrder){
    return {
      id: item._id,
      user: this.getUser(item.user),
      totalPrice: item.totalPrice,
      finalPrice: item.finalPrice,
      orderLines: item.orderLines,
      delivaryAddress: item.delivaryAddress,
      coupon: this.getCoupon(item.coupon),
      createdAt: this.dateService.toPersian(item.createdAt.toUTCString()),
      updatedAt: this.dateService.toPersian(item.createdAt.toUTCString()),
      status: item.status,
    } 
  };
  collection(items: IOrder[]){
    return items.map((item: IOrder) => {this.transform(item)})
  };

  private getUser(user: any){
    if(!user){ return null }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  }

  private getCoupon(coupon: any){
    if(!coupon){ return null }
    return {
      code: coupon.code,
      percent: coupon.percent
    }
  }
}