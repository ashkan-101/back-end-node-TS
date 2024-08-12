import { Schema, model } from 'mongoose'
import IOrder from './IOrder'
import OrderStatus from './OrderStatus'
import orderLineSchema from './OrderLine'

const orderSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  total_price: {type: Number, required: true},
  coupon: {type: Object, default: null},
  final_price: {type: Number, required: true},
  order_lines: {type: [orderLineSchema]},
  status: {type: OrderStatus, required: true, default: OrderStatus.INIT},
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}
})




export default model<IOrder>('Product', orderSchema)