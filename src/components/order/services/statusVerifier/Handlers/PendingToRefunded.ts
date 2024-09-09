import OrderStatus from "../../../model/OrderStatus";
import AbstractOrderHandler from "../AbstractOrderHandler";

export default class PendingToRefunded extends AbstractOrderHandler {
  public process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean {
    if(oldStatus === OrderStatus.PENDING && newStatus === OrderStatus.REFUNDED ){
      throw new Error('status not changed pending to refunded')
    }
    return true
  }
}