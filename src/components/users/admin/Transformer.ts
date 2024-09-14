import ITransformer from "../../contracts/ITransformer";
import IUser from "../model/IUser";
import DateService from "../../../services/DateService";

export default class UserTransformer implements ITransformer<IUser>{
  private readonly dateService: DateService

  constructor(){
    this.dateService = new DateService()
  }
  transform(item: IUser){
    return {
      id: item._id,
      firstName: item.lastName,
      lastName: item.lastName,
      email: item.email,
      mobile: item.mobile,
      totalOrders: item.totalOrders,
      wallet: item.wallet,
      addresses: item.addresses,
      createdAt: this.dateService.toPersian(item.createdAt.toUTCString())
    }
  }
  
  
  collection(items: IUser[]){
    return items.map((item) => this.transform(item))
  }
}