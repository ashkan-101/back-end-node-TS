import { Schema, model } from 'mongoose'
import IOrder from './IOrder'
import OrderStatus from './OrderStatus'
import orderLineSchema from './OrderLine'

const orderSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  totalPrice: {type: Number, required: true},
  finalPrice: {type: Number, required: true},
  orderLines: {type: [orderLineSchema]},
  deliveryAddress: {type: Object, required: true},
  coupon: {type: Schema.Types.ObjectId, ref: 'Coupon', default: null},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  status: {type: Number, required: true, enum: OrderStatus, default: OrderStatus.PENDING},
})

export default model<IOrder>('Order', orderSchema)