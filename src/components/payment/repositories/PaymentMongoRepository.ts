import IPaymentRepository from "./IPaymentRepository";
import PaymentModel from '../model/Payment'
import PaymentStatus from "../model/PaymentStatus";
import IPayment from "../model/IPayment";
import { FilterQuery } from "mongoose";

export default class PaymentMongoRepository implements IPaymentRepository {
  public async findOne(ID: string): Promise<IPayment | null> {
    const payment = await PaymentModel.findById(ID)
    return payment
  }

  public async findMany(params: any): Promise<IPayment[]> {
    return PaymentModel.find(params)
  } 

  public async create(params: any): Promise<IPayment> {
    const newPayment = await PaymentModel.create({...params})
    return newPayment.save()
  }

  public async updateOne(where: FilterQuery<IPayment>, updateData: Partial<IPayment>): Promise<boolean> {
    const updatePayment = await PaymentModel.updateOne(where, updateData)
    return updatePayment.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}