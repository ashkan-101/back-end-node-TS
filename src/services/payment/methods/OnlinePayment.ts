import IPayment from "../../../components/payment/model/IPayment";
import IPaymentMethod from "../contracts/IPaymentMethod";
import IPaymentRequest from "../contracts/IPaymentRequest";
import IPaymentVerify from "../contracts/IPaymentVerify";
import OnlineGatewayFactory from "../OnlineGatewayFactory";


export default class OnlinePayment implements IPaymentMethod {
  private gateway: string = ''
  private readonly onlineGatewayFactory: OnlineGatewayFactory

  constructor(){
    this.onlineGatewayFactory = new OnlineGatewayFactory()

  }
  
  public async doPayment(payment: IPayment): Promise<any> {
    const onlineGateway = this.onlineGatewayFactory.make(this.gateway)

    const paymentRequest: IPaymentRequest = {
      amount: payment.amount,
      description: `بابت پرداخل آنلاین سفارش ${payment.order}`,
      reserve: payment.reserve
    }
    const result = await onlineGateway.paymentRequest(paymentRequest)
    return result
  }

  public async setGateway(gateway: string){
    this.gateway = gateway
  }

  public async verifyPayment(clientPaymentData: any): Promise<{success: boolean, refId?: string}>{
    const onlineGateway = this.onlineGatewayFactory.make(this.gateway)

    const paymentVerify: IPaymentVerify = {
      amount: clientPaymentData.amount,
      refId: clientPaymentData.authority,
      status: clientPaymentData.status,
    }
    const result = await onlineGateway.paymentVerify(paymentVerify)
    return result
  }
}
 