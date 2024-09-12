import ICoupon from "../../../../components/coupon/model/ICoupen";
import IUser from "../../../../components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class UserHandler extends AbstractCouponHandler{
  public process(coupon: ICoupon, user?: IUser): ICoupon | null {
    if(user){

      const { userConstraint } = user!.constraints 
      if(user && user.id !== userConstraint){
        throw new Error('این کد تخفیف برای کاربری شما صادر نشده است')
      }

    }

    return super.process(coupon, user)
  }
}

export default UserHandler

