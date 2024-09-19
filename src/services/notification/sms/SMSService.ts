import ISMSMessage from "./contracts/ISMSMessage";
import ISMSProvider from "./contracts/ISMSProvider";
import SibSMS from "./providers/SibSMS";

export default class SMSService implements ISMSProvider {
    private readonly defaultProvider: ISMSProvider
  
  constructor(){
    this.defaultProvider = new SibSMS()
  }

    public send(message: ISMSMessage): void {
      this.defaultProvider.send(message)
    }
}