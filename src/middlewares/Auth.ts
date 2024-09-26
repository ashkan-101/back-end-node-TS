import { Request, Response, NextFunction } from "express"
import { verify } from '../services/TokenService'
import Unathorized from "../components/exceptions/Unauthorized"
import UserMongoRepository from "../components/users/repositories/UserMongoRepository"

const findUserById = new UserMongoRepository()

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization
    if(!token){
      throw new Unathorized('unAuthorized!')
    }
    
    const tokenResult = verify(token)

    if(!tokenResult){
      throw new Unathorized('unAuthorized!')
    }

    const checkUser = await findUserById.findOne(tokenResult.userId)

    if(!checkUser){
      throw new Unathorized('unAuthorized!')
    }

    req.user = checkUser
    next()

    } catch (error) {
      next(error)
  }
}