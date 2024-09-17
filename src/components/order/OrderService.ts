import NotFoundException from "../exceptions/NotFoundException";
import IOrder from "./model/IOrder";
import OrderStatus from "./model/OrderStatus";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import StatusVerifier from "./services/statusVerifier/StatusVerifier";
import IAddOrderData from "./IAddOrderData";
import IBasketItem from "../basket/IBasketItem";

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

  public async addOrder(orderData: IAddOrderData): Promise<IOrder | boolean>{
    const newOrder = await this.orderRepository.create({
      user: orderData.userId,
      totalPrice: orderData.items.reduce((total: number, item: IBasketItem) => (total + (item.price * item.count)), 0),
      finalPrice: orderData.items.reduce((total: number, item: IBasketItem) => (total + (item.price * item.count)), 0),
      orderLines: orderData.items.map((item: IBasketItem) => ({
        product: item.productId,
        price: item.price,
        discountedPrice: item.discountedPrice,
        count: item.count,
      })),
      deliveryAddress: orderData.deliveryAddress,
      coupon: orderData.coupon.code,
    })

    if(newOrder){
      return newOrder
    }
    return false
  }
}