import ISMSMessage from "../../../../services/notification/sms/contracts/ISMSMessage"

export default class OrderCompletedSMS implements ISMSMessage {
  public readonly to: string
  public readonly message: string
  
  constructor(to: string, orderId: string){
    this.to = to
    this.message = `سفارش شما با موفقیت ثبت شد و در روز های آینده برای شما ارسال میشود شماره سفارش: ${orderId}`
  }
}