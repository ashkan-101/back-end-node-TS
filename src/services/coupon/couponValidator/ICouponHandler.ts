import ICoupon from "../../../components/coupon/model/ICoupen";
import IUser from "../../../components/users/model/IUser";

interface CouponHandler {
  setNext(handler: CouponHandler): CouponHandler | null,
  process(user: IUser ,coupon: ICoupon): ICoupon | null
}

export default CouponHandler