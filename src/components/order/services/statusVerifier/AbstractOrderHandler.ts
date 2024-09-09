import OrderStatus from "../../model/OrderStatus"


abstract class AbstractOrderHandler {
  private successor?:AbstractOrderHandler | null = null

  constructor(successor: AbstractOrderHandler | null = null){
    this.successor = successor
  }

  public handle(newStatus: OrderStatus, oldStatus: OrderStatus): boolean{
    const result = this.process(newStatus, oldStatus)
    if(result && this.successor){
      return this.successor.handle(newStatus, oldStatus)
    }
    return result
  }

  protected abstract process(newStatus: OrderStatus, oldStatus: OrderStatus): boolean
}

export default AbstractOrderHandler