import IOnlineGateway from "../contracts/IOnlineGateway";
import ZarinpalCheckout from 'zarinpal-checkout'
import { config } from "dotenv";
import IPaymentRequest from "../contracts/IPaymentRequest";
import IPaymentVerify from "../contracts/IPaymentVerify";
config()

export default class ZarinPal implements IOnlineGateway{
  private readonly zarinpal
  private readonly merchantId = process.env.ZARINPAL_MERCHANTID as string
  private readonly sandbox = process.env.ZARINPAL_SANDBOX as unknown as boolean
  constructor(){
    this.zarinpal = ZarinpalCheckout.create(this.merchantId as string, true)
  }
 
  public async paymentRequest(request: IPaymentRequest): Promise<any> {
    const appUrl = process.env.APP_URL

    const requestResult = await this.zarinpal.PaymentRequest({
      Amount: request.amount, // In Tomans
      CallbackURL: `${appUrl}/payment/verify/${request.reserve}`,
      Description: request.description,
      // Email: 'hi@siamak.work',
      // Mobile: '09120000000'
    })
    console.log({request});
    console.log({requestResult});
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

  public async paymentVerify(verify: IPaymentVerify): Promise<any> {
    const verifyResult = await this.zarinpal.PaymentVerification({
      Amount: verify.amount, // In Tomans
      Authority: verify.refId,
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