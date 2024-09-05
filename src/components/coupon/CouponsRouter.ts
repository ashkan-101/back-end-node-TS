import { Router } from "express";
import CouponController from "./CouponsController";

const couponRouter: Router = Router()
const couponControllerInstance: CouponController = new CouponController()

couponRouter.post('/', couponControllerInstance.create)

export default couponRouter