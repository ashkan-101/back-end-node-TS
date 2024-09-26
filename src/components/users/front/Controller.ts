import { Request, Response, NextFunction } from "express"
import ServerException from "../../exceptions/ServerException"
import NotFoundException from "../../exceptions/NotFoundException"
import Service from "./Service"
import IAddress from "../model/IAddress"

class UsersController {
    private readonly service: Service

    constructor(){
        this.service = new Service()
    }

    public async saveAddress(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user?._id as string
            const oldAddresses = req.user?.addresses as IAddress[]
            const newAddress: IAddress = req.body
    
            const updateAddress = await this.service.updateUserAddrress(oldAddresses, newAddress, userId)
            if(!updateAddress){
                throw new ServerException('fail to save new Address!')
            }
            res.status(200).send({
                success: true,
                message: 'success save new Address'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default UsersController