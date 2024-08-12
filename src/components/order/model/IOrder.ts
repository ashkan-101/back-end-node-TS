import { Document } from 'mongoose'
import OrderStatus from './OrderStatus'
import { Address } from 'cluster'

export default interface IOrder extends Document{
    user: object,
    total_price: number,
    coupon: object
    final_price: number
    order_lines: [object]
    delivary_address: object
    status: OrderStatus
    created_at: Date
    updated_at: Date
}