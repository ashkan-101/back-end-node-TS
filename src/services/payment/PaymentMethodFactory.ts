import NotFoundException from "../../components/exceptions/NotFoundException";
import IPaymentMethod from "./contracts/IPaymentMethod";
import CODPayment from "./methods/CODPayment";
import GiftPayment from "./methods/GiftPayment";
import OnlinePayment from "./methods/OnlinePayment";

export default class PaymentMethodFactory {
  private methods: Map<string, IPaymentMethod> = new Map<string, IPaymentMethod>()

  constructor(){
    this.methods.set('online', new OnlinePayment())
    this.methods.set('cod', new CODPayment())
    this.methods.set('gift', new GiftPayment())
  }

  public make(method: string): IPaymentMethod{
    if(this.methods.has(method)){
      throw new NotFoundException('روش پرداخت مورد نظر یافت نشد!')
    }
      return this.methods.get(method) as IPaymentMethod
  }
}