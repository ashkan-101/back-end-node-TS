import { Document } from 'mongoose'
import OrderStatus from './OrderStatus'
import IAddress from '../../users/model/IAddress'
import IOrderLine from './IOrderLine'

export default interface IOrder extends Document{
    user: object
    totalPrice: number
    finalPrice: number
    orderLines: IOrderLine[]
    delivaryAddress: IAddress
    coupon: string
    createdAt: Date
    updatedAt: Date
    status: OrderStatus
}