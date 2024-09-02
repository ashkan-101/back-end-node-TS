import { Request, Response, NextFunction } from "express";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import IOrder from "./model/IOrder";
import ServerException from "../exceptions/ServerException";
import NotFoundException from "../exceptions/NotFoundException";

class OrdersController {
  private readonly ordersRepository: IOrderRepository
  constructor(){
    this.ordersRepository = new OrderMongoRepository()
  }

  public async index(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {

      // const order = await this.ordersRepository.findManya({})
      throw new NotFoundException('this order is notFound!')

    } catch (error: any) {
      // if(!error.status){
      //   next(new ServerException('server is unavailable!'))
      // }
      next(error)
    }
  }
}

export default OrdersController