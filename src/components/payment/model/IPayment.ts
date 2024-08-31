import { Document } from "mongoose";
import PaymentStatus from "./PaymentStatus";

export default interface IPayment extends Document {
  user: string
  order: string
  amount: number
  method: string
  reserve: string
  refrence: string
  createdAt: Date
  updatedAt: Date
  status: PaymentStatus
}