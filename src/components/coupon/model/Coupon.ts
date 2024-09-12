import { Schema, model } from "mongoose";
import CouponStatus from "./CouponStatus";
import ICoupon from "./ICoupen";

const couponSchema = new Schema({
  code: {type: String, required: true},
  percent: {type: Number, required: true},
  limit: {type: Number, default: 0},
  used: {type: Number, default: 0},
  expiresAt: {type: Date, default: null},
  constraints: {type: Object, default: null},
  status: {type: Number, enum: CouponStatus, default: CouponStatus.ACTIVE}
})

export default model<ICoupon>('Coupon', couponSchema)