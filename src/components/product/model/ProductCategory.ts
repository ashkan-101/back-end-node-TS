import { Schema, model } from 'mongoose'
import IProductCategory from './IProductCategory'
import IProductAttribute from './IProductAttribute'

const productCategoryEchema: Schema = new Schema({
    title: {type: String, required: true},
    total_product: {type: Number, default: 0},
    attributes: {type: [Object] }
})
export default model<IProductCategory>('Product', productCategoryEchema)