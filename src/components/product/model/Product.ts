import { Schema, model } from 'mongoose'
import IProduct from './IProduct'
import ProductStatus from './productStatus'

const productSchema: Schema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    disCountedPrice: {type: Number, default: 0},
    thumbnail: {type: String},
    gallery: {type: [String]},
    category: {type: Schema.Types.ObjectId, ref: "ProductCategory"},
    attributes: {type: [Object], required: true},
    variations: {type: [Object]},
    priceVariations: {type: [Object]},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()},
    stock: {type: Number, required: true},
    status: {
        type: Number,
        enum: ProductStatus,
        default: ProductStatus.INIT 
    }
})
export default model<IProduct>('Product', productSchema)