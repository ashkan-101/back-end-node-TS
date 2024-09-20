import NotFoundException from "../exceptions/NotFoundException";
import IOrder from "./model/IOrder";
import OrderStatus from "./model/OrderStatus";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import StatusVerifier from "./services/statusVerifier/StatusVerifier";
import IAddOrderData from "./IAddOrderData";
import IBasketItem from "../basket/IBasketItem";
import SMSService from "../../services/notification/sms/SMSService";
import MailService from "../../services/notification/mailer/MailService";
import OrderCompletedSMS from "./notifications/sms/OrderCompletedSMS";
import IUser from "../users/model/IUser";
import OrderCompletedMail from "./notifications/mail/OrderCompletedMail";

export default class OrderService {
  private readonly statusVerifier: StatusVerifier
  private readonly orderRepository: IOrderRepository
  private readonly smsService: SMSService
  private readonly mailService: MailService

  constructor(){
    this.statusVerifier = new StatusVerifier()
    this.orderRepository = new OrderMongoRepository()
    this.smsService = new SMSService()
    this.mailService = new MailService()
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

  public async completeOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne(orderId, ['user'])
    if(!order){
      throw new NotFoundException('invalid order')
    }
    this.updateStatus(orderId, OrderStatus.PAID_IN_PROGRESS)
    const user: Partial<IUser> = order.user
    if(user.mobile && user.email){
      const userMobile = user.mobile
      const userMail = user.email
      this.smsService.send(new OrderCompletedSMS(userMobile, orderId))
      this.mailService.send(new OrderCompletedMail(userMail, orderId))
    }
  }
}