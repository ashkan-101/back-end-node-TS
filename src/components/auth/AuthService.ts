import AuthFactory from "./AuthFactory"
import IUser from "../users/model/IUser"

class AuthService {
  private readonly authFactory: AuthFactory

  constructor(){
    this.authFactory = new AuthFactory()
  }

  public async authenticate(email: string, password: string): Promise<IUser | false>{
    const user = await this.authFactory.findUserByEmail(email)
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
    const newUser = await this.authFactory.createNewUser(
      firstName,
      lastName,
      email,
      hashedPassword
    )
    if(!newUser){
      return false
    }
    return newUser
  }
}

export default AuthService