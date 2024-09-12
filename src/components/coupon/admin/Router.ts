import { Router } from "express";
import CouponController from "./Controller";

const couponRouter: Router = Router()
const controller: CouponController = new CouponController()

couponRouter.get('/', controller.index)
couponRouter.post('/', controller.store)

export default couponRouter