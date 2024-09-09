import ICoupon from "../../../../components/coupon/model/ICoupen";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class ExpireHandler extends AbstractCouponHandler{
  public process(user: IUser, coupon: ICoupon): ICoupon | null {
    const now = new Date()
    if(coupon.expiresAt < now){
      throw new Error ('تاریخ انقضای کد به پایان رسیده است') 
    }
    
    return super.process(user,coupon)
  }
}

export default ExpireHandler