import { Schema, model } from "mongoose";
import CouponStatus from "./CouponStatus";
import ICoupon from "./ICoupen";

const couponSchema = new Schema({
  code: {type: String, required: true},
  amount: {type: Number, required: true},
  limit: {type: Number, default: 0},
  used: {type: Number, default: 0},
  expires_at: {type: Date, default: null},
  constraints: {type: Object, default: null},
  status: {type: CouponStatus, default: CouponStatus.ACTIVE}
})

export default model<ICoupon>('Coupon', couponSchema)