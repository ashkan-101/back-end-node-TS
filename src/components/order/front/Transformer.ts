import ITransformer from "../../contracts/ITransformer";
import IOrder from "../model/IOrder";
import DateService from "../../../services/DateService";

export default class OrderTransformer implements ITransformer<IOrder> {
  private readonly dateService: DateService

  constructor(){
    this.dateService = new DateService()
  }

  transform(item: IOrder){
    return {
      id: item._id,
      totalPrice: item.totalPrice,
      finalPrice: item.finalPrice,
      orderLines: item.orderLines,
      delivaryAddress: item.delivaryAddress,
      createdAt: this.dateService.toPersian(item.createdAt.toUTCString()),
      updatedAt: this.dateService.toPersian(item.createdAt.toUTCString()),
      status: item.status,
    } 
  };
  collection(items: IOrder[]){
    return items.map((item: IOrder) => {return this.transform(item)})
  };
}