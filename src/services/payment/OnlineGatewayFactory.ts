import NotFoundException from "../../components/exceptions/NotFoundException";
import IOnlineGateway from "./contracts/IOnlineGateway";
import ZarinPal from "./online/ZarinPal";


export default class OnlineGatewayFactory{
  private onlineGateway: Map<string, IOnlineGateway> = new Map<string, IOnlineGateway>()
  
  constructor(){
    this.onlineGateway.set('zarinpal', new ZarinPal())
  }

  public make(gateway: string): IOnlineGateway{
    if(!this.onlineGateway.has(gateway)){
      throw new NotFoundException('درگاه پرداخت مورد نظر یافت نشد')
    }
    return this.onlineGateway.get(gateway) as IOnlineGateway

  }
}