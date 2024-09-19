import IMailer from "./contracts/IMailer";
import IMailMessage from "./contracts/IMailMessage";
import MailTrap from "./providers/MailTrap";

export default class MailService implements IMailer {
  private readonly defaultMailProvider: IMailer

  constructor(){
    this.defaultMailProvider = new MailTrap()
  }
  
  public send(message: IMailMessage): void {
    this.defaultMailProvider.send(message)
  }
}