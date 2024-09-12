import { Router } from "express";
import CouponController from "./Controller";

const couponRouter: Router = Router()
const controller: CouponController = new CouponController()

couponRouter.post('/validation', controller.validateCoupon)

export default couponRouter