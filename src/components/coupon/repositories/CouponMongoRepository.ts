import ICouponRepository from "./ICouponRepository";
import CouponModel from '../model/Coupon'
import CouponStatus from "../model/CouponStatus";
import ICoupon from "../model/ICoupen";
import { FilterQuery } from "mongoose";

export default class CouponMongoRepository implements ICouponRepository {
  public async findOne(ID: string): Promise<ICoupon | null> {
    const coupon = await CouponModel.findById(ID)
    return coupon
  }

  public async findMany(params: any, relations?: string[]): Promise<ICoupon[]> {
    const couponQuery = CouponModel.find(params)
    if(relations && relations.length > 0){
      relations.forEach((relation: string) => {
        couponQuery.populate(relation)
      });
    }
    return await couponQuery.exec()
  } 

  public async findByStatus(status: CouponStatus): Promise<ICoupon[]> {
    return CouponModel.find({ status })
  }

  public async create(params: any): Promise<ICoupon> {
    const newCoupon = await CouponModel.create({...params})
    return newCoupon.save()
  }

  public async updateOne(where: FilterQuery<ICoupon>, updateData: Partial<ICoupon>): Promise<boolean> {
    const updateCoupon = await CouponModel.updateOne(where, updateData)
    return updateCoupon.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}