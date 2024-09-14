import { Request, Response, NextFunction } from "express"
import IUserRepository from "../repositories/IUserRepository"
import UserMongoRepository from "../repositories/UserMongoRepository"

class UsersController {
    private readonly userRepository: IUserRepository

    constructor(){
        this.userRepository = new UserMongoRepository()

        this.saveAddress = this.saveAddress.bind(this)
    }

    public async saveAddress(req: Request, res: Response, next: NextFunction){
        try {
            res.send(req.body)
        } catch (error) {
            next(error)
        }
    }

}

export default UsersController