import IShipmentRepository from "./IShipmentRepository";
import ShipmentModel from '../model/Shipment'
import IShipment from "../model/IShipment";
import { FilterQuery } from "mongoose";

export default class ShipmentMongoRepository implements IShipmentRepository {
  public async findOne(ID: string): Promise<IShipment | null> {
    const shipment = await ShipmentModel.findById(ID)
    return shipment
  }

  public async findMany(params: any): Promise<IShipment[]> {
    return ShipmentModel.find(params)
  } 

  public async create(params: any): Promise<IShipment> {
    const newShipment = await ShipmentModel.create({...params})
    return newShipment.save()
  }

  public async updateOne(where: FilterQuery<IShipment>, updateData: Partial<IShipment>): Promise<boolean> {
    const updateShipment = await ShipmentModel.updateOne(where, updateData)
    return updateShipment.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}