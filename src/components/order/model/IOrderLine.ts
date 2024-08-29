import { Document } from "mongoose";

export default interface IOrderLine extends Document {
  product: object,
  price: number,
  discountedPrice: number,
  count: number,
  createdAt: Date,
}