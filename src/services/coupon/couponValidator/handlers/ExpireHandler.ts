import ICoupon from "../../../../components/coupon/model/ICoupen";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class ExpireHandler extends AbstractCouponHandler{
  public process(coupon: ICoupon, user?: IUser): ICoupon | null {
    if(coupon.expiresAt){
      const now = new Date()
      if(coupon.expiresAt < now){
        throw new Error ('تاریخ انقضای کد به پایان رسیده است') 
      }
    }

    return super.process(coupon, user)
  }
}

export default ExpireHandler