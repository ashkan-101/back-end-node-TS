import NotFoundException from "../exceptions/NotFoundException";
import IOrder from "./model/IOrder";
import OrderStatus from "./model/OrderStatus";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import StatusVerifier from "./services/statusVerifier/statusVerifier";

export default class OrderService {
  private readonly statusVerifier: StatusVerifier
  private readonly orderRepository: IOrderRepository

  constructor(){
    this.statusVerifier = new StatusVerifier()
    this.orderRepository = new OrderMongoRepository()
  }
  
  public async updateStatus(orderID: string, newStatus: OrderStatus): Promise<boolean>{
    const order: IOrder | null = await this.orderRepository.findOne(orderID)

    if(!order){
      throw new NotFoundException('order not found')
    }
    
    const canStartTransition: boolean = this.statusVerifier.verify(newStatus, order.status)
    if(canStartTransition){
      this.orderRepository.updateOne({_id: orderID}, {status: newStatus})
    }
    return true
  }
}