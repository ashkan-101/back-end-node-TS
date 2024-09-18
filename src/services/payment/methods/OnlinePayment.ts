import IOrder from "../../../components/order/model/IOrder";
import IPaymentMethod from "../contracts/IPaymentMethod";
import OnlineGatewayFactory from "../OnlineGatewayFactory";


export default class OnlinePayment implements IPaymentMethod {
  private gateway: string = ''
  private readonly onlineGatewayFactory: OnlineGatewayFactory

  constructor(){
    this.onlineGatewayFactory = new OnlineGatewayFactory()

  }
  
  public async doPayment(order: IOrder): Promise<any> {
    const gateway = this.onlineGatewayFactory.make(this.gateway)
  }

  public async setGateway(gateway: string){
    this.gateway = gateway
  }
} 