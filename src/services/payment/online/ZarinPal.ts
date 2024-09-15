import IOnlineGateway from "../contracts/IOnlineGateway";
import ZarinpalCheckout from 'zarinpal-checkout'
import { config } from "dotenv";
config()

export default class ZarinPal implements IOnlineGateway{
  private readonly zarinpal
  private readonly merchantId = process.env.ZARINPAL_MERCHANTID as string
  private readonly sandbox = process.env.ZARINPAL_SANDBOX as unknown as boolean
  constructor(){
    this.zarinpal = ZarinpalCheckout.create(this.merchantId, this.sandbox)
  }
 
  public async paymentRequest(): Promise<any> {

    const appUrl = process.env.APP_URL

    const requestResult = await this.zarinpal.PaymentRequest({
      Amount: 1000, // In Tomans
      CallbackURL: `${appUrl}/payment/verify/zarinpal`,
      Description: 'A Payment from Node.JS',
      // Email: 'hi@siamak.work',
      // Mobile: '09120000000'
    })

    if(requestResult && requestResult.status === 100){
      return {
        success: true,
        url: requestResult.url,
      }
    }
    return {
      success: false
    }

  }

  public async paymentVerify(): Promise<any> {
    const verifyResult = await this.zarinpal.PaymentVerification({
      Amount: 1000, // In Tomans
      Authority: '000000000000000000000000000000000000',
    })

    if(verifyResult && verifyResult.status === 100){
      return {
        success:true,
        refId: verifyResult.RefID,
        status: verifyResult.status
      }
    }
    return {
      success: false
    }
  }
  
}