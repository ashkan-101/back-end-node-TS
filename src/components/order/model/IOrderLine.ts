import { Document } from "mongoose";

export default interface IOrderLine extends Document {
  price: number,
  product: object,
  created_at: Date,
}