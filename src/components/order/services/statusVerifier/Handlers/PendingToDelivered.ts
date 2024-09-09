import OrderStatus from "../../../model/OrderStatus";
import AbstractOrderHandler from "../AbstractOrderHandler";

export default class PendingToDelivered extends AbstractOrderHandler {
  public process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean {
    if(oldStatus === OrderStatus.PENDING && newStatus === OrderStatus.DELIVERED ){
      throw new Error('status not changed pending to delivered')
    }
    return true
  }
}