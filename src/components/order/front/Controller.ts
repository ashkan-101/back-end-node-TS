import { Request, Response, NextFunction } from "express";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import ServerException from "../../exceptions/ServerException";
import NotFoundException from "../../exceptions/NotFoundException";
import Order from "../model/Order";
import OrderService from "../OrderService";


class OrdersController {
  private readonly ordersRepository: IOrderRepository

  constructor(){
    this.ordersRepository = new OrderMongoRepository()

  }
}

export default OrdersController