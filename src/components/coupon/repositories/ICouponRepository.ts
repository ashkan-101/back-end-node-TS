import IRepository from "../../contracts/IRepository";
import ICoupon from "../model/ICoupen";

export default interface ICouponRepository extends IRepository<ICoupon> {
  findByCode(code: string): Promise<ICoupon | null>

}