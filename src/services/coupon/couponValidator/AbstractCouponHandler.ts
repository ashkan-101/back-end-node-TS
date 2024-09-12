import ICoupon from '../../../components/coupon/model/ICoupen';
import IUser from '../../../components/users/model/IUser';
import ICouponHandler from './ICouponHandler'

abstract class AbstractCouponHandler implements ICouponHandler {
  private nextHandler: ICouponHandler | null = null;

  public setNext(handler: ICouponHandler): ICouponHandler {
    this.nextHandler = handler
    return handler
  }

  public process(coupon: ICoupon, user?: IUser): ICoupon | null{
    if (this.nextHandler) {
      return this.nextHandler.process(coupon, user)
    }
    return null
  }
}

export default AbstractCouponHandler