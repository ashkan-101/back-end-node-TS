import IMailer from "../contracts/IMailer";
import IMailMessage from "../contracts/IMailMessage";
import nodemailer from 'nodemailer'

export default class MailTrap implements IMailer{
  private readonly smtpTransport: any

  constructor(){
    this.smtpTransport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7b1c8604268c15",
        pass: "********220d"
      }
    })
  }
  
  public send(message: IMailMessage): void {
    this.smtpTransport.sendMail({
      from: 'node@gamil.com',
      to: message.receipent,
      subject: message.subject,
      text: message.body
    })
  }
}