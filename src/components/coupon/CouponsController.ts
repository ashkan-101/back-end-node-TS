import { Request, Response, NextFunction } from "express";
import Coupon from "./model/Coupon";
import ICouponRepository from "./repositories/ICouponRepository";
import CouponMongoRepository from "./repositories/CouponMongoRepository";

class CouponController {
  private readonly couponRepository: ICouponRepository

  constructor(){
    this.couponRepository = new CouponMongoRepository()
  }

  public async create(req: Request, res: Response, next: NextFunction){
    try {
      const newCouponParams = {
        code: '1llpo0',
        amount: 20,
        expiresAt: Date.now() + 3600000
      }
      const newCoupon = await Coupon.create(newCouponParams)
      res.send(newCoupon)
    } catch (error: any) {
      next(error.message)
    }
  }
}

export default CouponController