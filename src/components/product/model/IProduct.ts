import { Document } from 'mongoose'
import ProductStatus from './productStatus'

export default interface IProduct extends Document{

    title: string,

    price: number,

    sale_price: number

    thumbnail: string,

    gallery?: [string],

    created_at: Date,

    updated_at: Date,

    status: ProductStatus,
}