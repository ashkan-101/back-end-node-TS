import { Document } from 'mongoose'
import OrderStatus from './OrderStatus'

export default interface IOrder extends Document{
    user: object,
    total_price: number,
    coupon: object
    final_price: number
    status: OrderStatus
    created_at: Date
    updated_at: Date
}