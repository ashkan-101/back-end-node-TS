export default interface IAddOrderData {
  items: any[],
  userId: string,
  coupon: {
    code: string,
    percent: number
  },
  deliveryAddress: any
  paymentMethod: string
}