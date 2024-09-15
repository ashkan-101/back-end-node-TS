export default interface IPaymentMethod {
  doPayment(): Promise<any>
}