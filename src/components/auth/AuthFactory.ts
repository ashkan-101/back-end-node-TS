import IUserRepository from "../users/repositories/IUserRepository";
import UserMongoRepository from "../users/repositories/UserMongoRepository";
import PasswordService from "../../services/PasswordService";
import UserTransformer from "../users/admin/Transformer";
import ITransformer from "../contracts/ITransformer";
import IUser from "../users/model/IUser";


export default class AuthFactory {
  public userRepository(){
    const userRepository: IUserRepository = new UserMongoRepository()
    return userRepository
  }

  public userTransformer(){
    const userTransformer: ITransformer<IUser> = new UserTransformer()
    return userTransformer
  }

  public passwordService(){
    const passwordService = new PasswordService()
    return passwordService
  }
}