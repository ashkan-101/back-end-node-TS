import IOrderRepository from "./IOrderRepository";
import OrderModel from '../model/Order'
import OrderStatus from "../model/OrderStatus";
import IOrder from "../model/IOrder";
import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";
import IUser from "../../users/model/IUser";
import IUserRepository from "../../users/repositories/IUserRepository";
import UserMongoRepository from "../../users/repositories/UserMongoRepository";

export default class OrderMongoRepository implements IOrderRepository {
  private readonly userRepository: IUserRepository

  constructor(){
    this.userRepository = new UserMongoRepository()
  }
  
  public async findOne(ID: string): Promise<IOrder | null> {
    const order = await OrderModel.findById(ID)
    return order
  }

  public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IOrder[]> {
    const orderQuery = OrderModel.find(params)
    if(relations && relations.length > 0){
      relations.forEach((relation: string) => {
        orderQuery.populate(relation)
      });
    }
    if(pagination){
      orderQuery.limit(pagination.itemsPerPage).skip(pagination.offset)
    }

    return await orderQuery.exec()
  } 

  public async findByUserDetails(userParams: Partial<IUser>, relations?: string[], pagination?: IPagination): Promise<IOrder[]> {
    if(userParams.firstName !== undefined && userParams.lastName !== undefined && userParams.email !== undefined){
      const users = await this.userRepository.findMany({
        $or: [
          {firstName: {$regex: userParams.firstName}},
          {lastName: {$regex: userParams.lastName}},
          {email: {$regex: userParams.email}}
        ]
      })
      return this.findMany({ "user": {$in: users.map((user: IUser) => user._id)}}, relations, pagination)
    }
    return this.findMany({}, relations, pagination)
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