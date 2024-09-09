import { Router } from "express";
import CouponController from "./CouponsController";

const couponRouter: Router = Router()
const couponControllerInstance: CouponController = new CouponController()

couponRouter.get('/', couponControllerInstance.index)
couponRouter.post('/', couponControllerInstance.store)

export default couponRouter