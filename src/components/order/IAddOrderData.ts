export default interface IAddOrderData {
  userId: string,
  items: any[],
  coupon: {
    code: string,
    percent: number
  },
  deliveryAddress: any
  paymentMethod?: string
}