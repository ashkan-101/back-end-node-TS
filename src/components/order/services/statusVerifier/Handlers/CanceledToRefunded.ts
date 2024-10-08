import ServerException from "../../../../exceptions/ServerException";
import OrderStatus from "../../../model/OrderStatus";
import AbstractOrderHandler from "../AbstractOrderHandler";

export default class CanceledToRefunded extends AbstractOrderHandler {
  public process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean {
    if(oldStatus === OrderStatus.CANCELED && newStatus === OrderStatus.REFUNDED ){
      throw new ServerException('status not changed canceled to refunded')
    }
    return true
  }
}