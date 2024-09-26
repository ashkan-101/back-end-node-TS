import IUserRepository from "../repositories/IUserRepository";
import UserMongoRepository from "../repositories/UserMongoRepository";
import UserTransformer from "./Transformer";

export default class Factory {
  private readonly userRepository: IUserRepository

  constructor(){
    this.userRepository = new UserMongoRepository()
  }

  public async allUsers(){
    return await this.userRepository.findMany({})
  }

  public transformer(){
    return new UserTransformer()
  }
}