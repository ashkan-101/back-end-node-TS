import ICoupon from "../../../../components/coupon/model/ICoupen";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class UserHandler extends AbstractCouponHandler{
  public process(user: IUser, coupon: ICoupon): ICoupon | null {
    const { userConstraint } = coupon.constraints 
    if(user.id !== userConstraint){
      throw new Error('این کد تخفیف برای کاربری شما صادر نشده است')
    }
    return super.process(user, coupon)
  }
}

export default UserHandler