import { Schema } from "mongoose";
const orderLineSchema: Schema = new Schema({
  price: {type: Number, required: true},
  product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
  created_at: {type: Date, default: Date.now()}
})

export default orderLineSchema