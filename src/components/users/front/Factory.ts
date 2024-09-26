import IAddress from "../model/IAddress";
import IUserRepository from "../repositories/IUserRepository";
import UserMongoRepository from "../repositories/UserMongoRepository";



export default class Factory {
  private readonly userRepository: IUserRepository

  constructor(){
    this.userRepository = new UserMongoRepository()
  }

  public async updateUserAddress(userId: string, newAddresses: IAddress[]){
    return await this.userRepository.updateOne({_id: userId}, {addresses: newAddresses})
  }
}