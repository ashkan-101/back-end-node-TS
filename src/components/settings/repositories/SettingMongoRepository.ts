import ISettingRepository from "./ISettingRepository";
import SettingModel from '../model/Setting'
import ISetting from "../model/ISetting";
import { FilterQuery } from "mongoose";

export default class SettingMongoRepository implements ISettingRepository {
  public async findOne(ID: string): Promise<ISetting | null> {
    const setting = await SettingModel.findById(ID)
    return setting
  }

  public async findMany(params: any): Promise<ISetting[]> {
    return SettingModel.find(params)
  } 

  public async create(params: any): Promise<ISetting> {
    const newSetting = await SettingModel.create({...params})
    return newSetting.save()
  }

  public async updateOne(where: FilterQuery<ISetting>, updateData: Partial<ISetting>): Promise<boolean> {
    const updateSetting = await SettingModel.updateOne(where, updateData)
    return updateSetting.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}