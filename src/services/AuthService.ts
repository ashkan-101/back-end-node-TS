import IUserRepository from "../components/users/repositories/IUserRepository"
import UserMongoRepository from "../components/users/repositories/UserMongoRepository"
import { comparePassword } from './HashService'

class AuthService {
  private readonly usersRepository: IUserRepository

  constructor(){
    this.usersRepository = new UserMongoRepository()
  }

  public async authenticate(email: string, password: string): Promise<boolean>{
    const user = await this.usersRepository.findByEmail(email)
    if(!user){
      return false
    }
    return comparePassword(password, user.password)
  }
}

export default AuthService