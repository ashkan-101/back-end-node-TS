import { Request, Response, NextFunction } from "express"
import { verify } from '../services/TokenService'
import Unathorized from "../components/exceptions/Unauthorized"


export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization
    if(!token){
      throw new Unathorized('unAuthorized!')
    }
    
    const tokenResult = verify(token)

    if(!tokenResult){
      throw new Unathorized('unAuthorized!')
    }

    req.userId = tokenResult.userId
    next()

    } catch (error) {
      next(error)
  }
}