import { Schema, model } from 'mongoose'
import IProduct from './IProduct'
import ProductStatus from './productStatus'

const productSchema: Schema = new Schema({

    title: {type: String, required: true},

    price: {type: Number, required: true},

    sale_price: {type: Number, default: 0},

    thumbnail: {type: String},

    gallery: {type: [String]},

    created_at: {type: Date, default: Date.now()},

    updated_at: {type: Date, default: Date.now()},

    status: {type: ProductStatus, default: ProductStatus.INIt}
})

export default model<IProduct>('Product', productSchema)