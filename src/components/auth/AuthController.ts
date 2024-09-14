import { Request, Response, NextFunction } from "express"
import { sign, verify } from '../../services/TokenService'
import IUser from "../users/model/IUser"
import User from "../users/model/User"
import AuthService from "../../services/AuthService"
import ServerException from "../exceptions/ServerException"
import NotFoundException from "../exceptions/NotFoundException"
import ValidationException from "../exceptions/ValidationException"
import UserTransformer from "../users/admin/Transformer"


class AuthController {
  private readonly authService: AuthService

  constructor(){
    this.authService = new AuthService()

    this.authenticate = this.authenticate.bind(this)
    this.register = this.register.bind(this)
    this.check = this.check.bind(this)
  }

  public async authenticate(req: Request, res: Response, next: NextFunction){
    const userTransformer = new UserTransformer()
    try {
      const {email, password} = req.body
      const user = await this.authService.authenticate(email, password)

      if(!user){
        throw new NotFoundException('not found any user with this information...please enter valid Data')
      }

      let id: string = ''
      if(user instanceof User){
        id = user.id
      }

      res.status(200).send({
        success: true,
        message: 'success login',
        user: userTransformer.transform(user as IUser),
        token: sign({userId: id})
      })
    } catch (error) {
      next(error)
    }
  }

  public async register(req: Request, res: Response, next: NextFunction){
    try {
      const {firstName, lastName, email, password} = req.body
      
      const registerResult = await this.authService.register(firstName, lastName, email, password)

      if(!registerResult){
        throw new ServerException('invalig register, please try again later')
      }

      res.status(201).send({
        success: true,
        registerResult
      })
    } catch (error) {
      next(error)
    }
  }

  public async check(req: Request, res: Response, next: NextFunction){
    try {
      const { authToken } = req.body 
      const verifyResult = verify(authToken)
      if(!verifyResult){
        throw new ValidationException('provided token is not valid!')
      }

      res.status(200).send({
        success: true,
        message: 'token is valid'
      })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController