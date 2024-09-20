import IMailMessage from "../../../../services/notification/mailer/contracts/IMailMessage"

export default class OrderCompletedMail implements IMailMessage {
  public readonly subject: string
  public readonly receipent: string
  public readonly body: string
  
  constructor(receipent: string, orderId: string){
    this. receipent = receipent
    this.subject = 'پرداخت سفارش',
    this.body = `سفارش شما با موفقیت ثبت شد شماره سفارش: ${orderId}`
  }
}