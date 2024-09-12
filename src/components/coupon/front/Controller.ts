import { Request, Response, NextFunction } from "express";
import ICouponRepository from "../repositories/ICouponRepository";
import CouponMongoRepository from "../repositories/CouponMongoRepository";
import ValidationException from "../../exceptions/ValidationException";
import CouponValidator from "../../../services/coupon/couponValidator/CouponValidator";
import NotFoundException from "../../exceptions/NotFoundException";

class CouponController {
  private readonly couponRepository: ICouponRepository

  constructor(){
    this.couponRepository = new CouponMongoRepository()

    this.validateCoupon = this.validateCoupon.bind(this)
  }

  public async validateCoupon(req: Request, res: Response, next: NextFunction){
    const couponValidator = new CouponValidator()
    try {
      const {couponCode} = req.body
      if(!couponCode){
        throw new ValidationException("کد تخفیف موردنظر معتبر نمی باشد")
      }
      
      const coupon = await this.couponRepository.findByCode(couponCode)
      if(!coupon){
        throw new NotFoundException("کد تخفیف موردنظر معتبر نمی باشد")
      }

      couponValidator.handler(coupon)
      res.status(200).send({
        success: true,
        message: 'کد تخفیف با موفقیت اعمال شد',
        coupon: {
          percent: coupon.percent,
          code: coupon.code
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

export default CouponController