import { Schema, model } from 'mongoose'
import IProduct from './IProduct'
import ProductStatus from './productStatus'
import { config } from 'dotenv'
config()

const productSchema: Schema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    disCountedPrice: {type: Number, default: 0},
    thumbnail: {type: String},
    gallery: {type: [String]},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
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

productSchema.virtual('thumbnailUrl').get(function (this: IProduct) {
    return `${process.env.APP_URL}:${process.env.APP_PORt}/contents/${this.thumbnail}`
})

productSchema.virtual('galleryUrl').get(function (this: IProduct){
    return this.gallery?.map((item: string) => {
        return `${process.env.APP_URL}:${process.env.APP_PORt}/contents/${item}`
    })
})

export default model<IProduct>('Product', productSchema)