import { Request, Response, NextFunction } from "express"
import { verify } from "../../../services/TokenService"
import IUserRepository from "../repositories/IUserRepository"
import UserMongoRepository from "../repositories/UserMongoRepository"
import Unathorized from "../../exceptions/Unauthorized"
import ServerException from "../../exceptions/ServerException"
import NotFoundException from "../../exceptions/NotFoundException"

class UsersController {
    private readonly userRepository: IUserRepository

    constructor(){
        this.userRepository = new UserMongoRepository()

        this.saveAddress = this.saveAddress.bind(this)
    }

    public async saveAddress(req: Request, res: Response, next: NextFunction){
        try {
            const verifyToken = verify(req.headers.authorization as string)

            if(!verifyToken){
                throw new Unathorized('unathorized!')
            }
            const user = await this.userRepository.findOne(verifyToken.userId)

            if(!user){
                throw new NotFoundException('user not found!')
            }

            let newAddresses = []
            if(user?.addresses){
                newAddresses = [...user.addresses, {...req.body}]
            }else{
                newAddresses = [{...req.body}]
            }

            const updateAddresses = await this.userRepository.updateOne({_id: user._id}, {addresses: newAddresses})

            if(!updateAddresses){
                throw new ServerException('proccess not successfully!')
            }

            res.status(200).send({
                success: true,
                message: "saved new address!"
            })

        } catch (error) {
            next(error)
        }
    }
}

export default UsersController