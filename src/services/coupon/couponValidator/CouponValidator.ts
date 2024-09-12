import ICoupon from "../../../components/coupon/model/ICoupen";
import IUser from "../../../components/users/model/IUser";
import ExpireHandler from "./handlers/ExpireHandler";
import LimitHandler from "./handlers/LimitHandler";
import UserHandler from "./handlers/UserHandler";

class CouponValidator{

  public handler(coupon: ICoupon, user?: IUser){
    const userHandler = new UserHandler()
    const limitHandler = new LimitHandler()
    const expireHandler = new ExpireHandler()

    userHandler.setNext(limitHandler).setNext(expireHandler)
    return userHandler.process(coupon, user)
  }
}

export default CouponValidator