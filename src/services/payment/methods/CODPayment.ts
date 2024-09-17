import IPaymentMethod from "../contracts/IPaymentMethod";

export default class CODPayment implements IPaymentMethod{
  public async doPayment(): Promise<void> {

  }
}