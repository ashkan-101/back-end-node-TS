import { model, Schema } from "mongoose";
import IProductOffer from "./IProductOffer";
import productOfferItemSchema from "./ProductOfferItem";

const productOfferSchema: Schema = new Schema({
  products: {type: [productOfferItemSchema], required: true},
  start_date: {type: Date, required: true},
  end_date: {type: Date, required: true}, 
  created_at: {type: Date, default: Date.now()}
})

export default model<IProductOffer>('ProductOffer', productOfferSchema)