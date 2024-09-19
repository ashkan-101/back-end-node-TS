import IPayment from "../../../components/payment/model/IPayment";

export default interface IPaymentMethod {
  doPayment(payment: IPayment): Promise<any>
}