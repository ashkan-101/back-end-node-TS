import IUserRepository from "./IUserRepository";
import UserModel from '../model/User'
import IUser from '../model/IUser';
import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";

export default class UserMongoRepository implements IUserRepository {

  public async findOne(ID: string): Promise<IUser | null> {
    const user = await UserModel.findById(ID)
    if(!user){
      return null
    }
    return user
  }

  public async findMany(params: any, relations?: string[], pagination?: IPagination): Promise<IUser[]> {
    const userQuery = UserModel.find(params)
    if(relations && relations.length > 0){
      relations.forEach((relation: string) => {
        userQuery.populate(relation)
      });
    }
    if(pagination){
      userQuery.limit(pagination.itemsPerPage).skip(pagination.offset)
    }

    return await userQuery.exec()
  } 

  public async create(params: any): Promise<IUser> {
    const newUser = await UserModel.create({...params})
    return newUser.save()
  }

  public async updateOne(where: FilterQuery<IUser>, updateData: Partial<IUser>): Promise<boolean> {
    const updateUser = await UserModel.updateOne(where, updateData)
    return updateUser.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {}
  public async deleteOne(where: any): Promise<any> {}
  public async deleteMany(where: any): Promise<any> {}

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({email: email})
    return user
  }
}