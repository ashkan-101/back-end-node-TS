import IUserRepository from "../users/repositories/IUserRepository";
import UserMongoRepository from "../users/repositories/UserMongoRepository";
import PasswordService from "../../services/PasswordService";
import UserTransformer from "../users/admin/Transformer";
import ITransformer from "../contracts/ITransformer";
import IUser from "../users/model/IUser";


export default class AuthFactory {
  private readonly userRepository: IUserRepository

  constructor(){
    this.userRepository = new UserMongoRepository()
  }
  
  public findUserByEmail(email: string){
    return this.userRepository.findByEmail(email)
  }

  public createNewUser(firstName: string, lastName: string, email: string, password: string){
    return this.userRepository.create({firstName, lastName, email, password})
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