import { Request, Response, NextFunction } from "express";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import IOrder from "./model/IOrder";

class OrdersController {
  private readonly ordersRepository: IOrderRepository
  constructor(){
    this.ordersRepository = new OrderMongoRepository()
  }

  public async index(req: Request, res: Response): Promise<void>{
    const orders = this.ordersRepository.findMany({})
    res.send(orders)
  }
}

export default OrdersController