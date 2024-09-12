import { Request, Response, NextFunction } from "express"
import AuthService from "../../services/AuthService"
import NotFoundException from "../exceptions/NotFoundException"

class AuthController {
  private readonly authService: AuthService

  constructor(){
    this.authService = new AuthService()

    this.authenticate = this.authenticate.bind(this)
  }

  public async authenticate(req: Request, res: Response, next: NextFunction){
    try {
      const {email, password} = req.body
      const authResult = this.authService.authenticate(email, password)

      if(!authResult){
        throw new NotFoundException('not found any user with this information')
      }

      res.status(200).send({
        success: true,
        message: 'success login',
        token: ''
      })

    } catch (error) {
      next(error)
    }
  }
}

export default AuthController