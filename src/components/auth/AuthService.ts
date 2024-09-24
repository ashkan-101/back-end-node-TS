import AuthFactory from "./AuthFactory"
import IUser from "../users/model/IUser"

class AuthService {
  private readonly authFactory: AuthFactory

  constructor(authFactory: AuthFactory){
    this.authFactory = authFactory
  }

  public async authenticate(email: string, password: string): Promise<IUser | false>{
    const user = await this.authFactory.userRepository().findByEmail(email)
    if(!user){
      return false
    }
    if(this.authFactory.passwordService().comparePassword(password, user.password)){
      return this.authFactory.userTransformer().transform(user)
    }
    return false
  }

  public async register (firstName: string, lastName: string, email: string, password: string): Promise<false | IUser>{
    const hashedPassword = this.authFactory.passwordService().hashPassword(password)
    const newUser = await this.authFactory.userRepository().create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    if(!newUser){
      return false
    }
    return newUser
  }
}

export default AuthService