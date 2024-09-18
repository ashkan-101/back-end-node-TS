export default interface IPaymentRequest {
  amount: number
  user?: {
    id: string,
    firstName: string,
    lastName: string,
    email?: string,
    mobile?: string
  }
  reserve?: string
  description: string
}