import IOrder from "../../../components/order/model/IOrder";

export default interface IPaymentMethod {
  doPayment(order: IOrder): Promise<any>
}