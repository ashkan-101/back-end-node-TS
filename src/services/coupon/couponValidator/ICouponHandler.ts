import ICoupon from "../../../components/coupon/model/ICoupen";
import IUser from "../../../components/users/model/IUser";

interface CouponHandler {
  setNext(handler: CouponHandler): CouponHandler | null,
  process(coupon: ICoupon, user?: IUser): ICoupon | null
}

export default CouponHandler