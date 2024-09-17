import IOrder from "../../../components/order/model/IOrder";
import IPaymentMethod from "../contracts/IPaymentMethod";


export default class OnlinePayment implements IPaymentMethod {
  public async doPayment(order: IOrder): Promise<any> {
     
  }
} 