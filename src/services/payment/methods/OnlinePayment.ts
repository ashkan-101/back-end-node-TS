import IOrder from "../../../components/order/model/IOrder";
import IPaymentMethod from "../contracts/IPaymentMethod";
import IPaymentRequest from "../contracts/IPaymentRequest";
import OnlineGatewayFactory from "../OnlineGatewayFactory";


export default class OnlinePayment implements IPaymentMethod {
  private gateway: string = ''
  private readonly onlineGatewayFactory: OnlineGatewayFactory

  constructor(){
    this.onlineGatewayFactory = new OnlineGatewayFactory()

  }
  
  public async doPayment(order: IOrder): Promise<any> {
    const onlineGateway = this.onlineGatewayFactory.make(this.gateway)

    const paymentRequest: IPaymentRequest = {
      amount: order.finalPrice,
      description: `بابت پرداخل آنلاین سفارش ${order._id}`
    }
    const result = await onlineGateway.paymentRequest(paymentRequest)
    return result
  }

  public async setGateway(gateway: string){
    this.gateway = gateway
  }
} 