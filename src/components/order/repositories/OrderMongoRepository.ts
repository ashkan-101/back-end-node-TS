import IOrderRepository from "./IOrderRepository";
import OrderModel from '../model/Order'
import OrderStatus from "../model/OrderStatus";
import IOrder from "../model/IOrder";
import { FilterQuery } from "mongoose";

export default class OrderMongoRepository implements IOrderRepository {
  public async findOne(ID: string): Promise<IOrder | null> {
    const order = await OrderModel.findById(ID)
    return order
  }

  public async findMany(params: any): Promise<IOrder[]> {
    return OrderModel.find(params)
  } 

  public async findByStatus(status: OrderStatus): Promise<IOrder[]> {
    return OrderModel.find({ status })
  }

  public async create(params: any): Promise<IOrder> {
    const newOrder = await OrderModel.create({...params})
    return newOrder.save()
  }

  public async updateOne(where: FilterQuery<IOrder>, updateData: Partial<IOrder>): Promise<boolean> {
    const updateOrder = await OrderModel.updateOne(where, updateData)
    return updateOrder.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}