import ICoupon from "../../../../components/coupon/model/ICoupen";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class LimitHandler extends AbstractCouponHandler{
  public process(user: IUser, coupon: ICoupon): ICoupon | null {
    if(coupon.used >= coupon.limit){
      throw new Error('این کد تخفیف معتبر نیست')
    }
    return super.process(user, coupon)
  }
}

export default LimitHandler