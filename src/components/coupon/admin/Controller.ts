import { Request, Response, NextFunction } from "express";
import Coupon from "../model/Coupon";
import ICouponRepository from "../repositories/ICouponRepository";
import CouponMongoRepository from "../repositories/CouponMongoRepository";

class CouponController {
  private readonly couponRepository: ICouponRepository

  constructor(){
    this.couponRepository = new CouponMongoRepository()
    
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction){
    try {
      const coupons = await this.couponRepository.findMany({})
      res.send(coupons)
    } catch (error) {
      next(error)
    }
  }

  public async store(req: Request, res: Response, next: NextFunction){
    try {
      const newCouponParams = {
        code: req.body.code,
        amount: req.body.amount,
        limit: req.body.limit,
        expiresAt: req.body.expiresAt,
        constraints: req.body.constraints,
      }
      const newCoupon = await this.couponRepository.create(newCouponParams)
      if(newCoupon){
        res.status(201).send({
          success: true,
          status: 200,
          message: 'success create coupon'
        })
      }
    } catch (error: any) {
      next(error)
    }
  }
}

export default CouponController