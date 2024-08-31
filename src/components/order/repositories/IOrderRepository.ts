import IRepository from "../../contracts/IRepository";
import OrderStatus from "../model/OrderStatus";
import IOrder from "../model/IOrder";


export default interface IOrderRepository extends IRepository<IOrder>{
  findByStatus(status: OrderStatus): Promise<IOrder[]>
}