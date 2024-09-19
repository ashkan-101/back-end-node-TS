import IPaymentRepository from "./IPaymentRepository";
import PaymentModel from '../model/Payment'
import PaymentStatus from "../model/PaymentStatus";
import IPayment from "../model/IPayment";
import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";

export default class PaymentMongoRepository implements IPaymentRepository {
  public async findOne(ID: string, relations?: string[]): Promise<IPayment | null> {
    const paymentQuery = PaymentModel.findById(ID)
    if(relations && relations.length > 0){
      relations.forEach((relation) => {
        paymentQuery.populate(relation)
      })
    }
    return await paymentQuery.exec()
  }

  public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IPayment[]> {
    const paymentQuery = PaymentModel.find(params)
    if(relations && relations.length > 0){
      relations.forEach((relation: string) => {
        paymentQuery.populate(relation)
      });
    }
    if(pagination){
      paymentQuery.limit(pagination.itemsPerPage).skip(pagination.offset)
    }

    return await paymentQuery.exec()
  } 

  public async create(params: any): Promise<IPayment> {
    const newPayment = await PaymentModel.create({...params})
    return newPayment.save()
  }

  public async updateOne(where: FilterQuery<IPayment>, updateData: Partial<IPayment>): Promise<boolean> {
    const updatePayment = await PaymentModel.updateOne(where, updateData)
    return updatePayment.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {}
  public async deleteOne(where: any): Promise<any> {}
  public async deleteMany(where: any): Promise<any> {}

  public async findByReserve(reserve: string): Promise<IPayment | null> {
    const payment = await PaymentModel.findOne({reserve: reserve})
    return payment
  }
}