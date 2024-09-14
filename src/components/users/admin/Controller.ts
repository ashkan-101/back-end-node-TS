import { Request, Response } from "express"
import User from "../model/User"

class UsersController {
    // constructor(){
    //     this.getUsers = this.getUsers.bind(this)
    // }

    public async index(req: Request, res: Response){
        const users = await User.find()

        res.send({users})
    }

    public async createUser(req: Request, res: Response){
    //     const newUser = await User.create({
    //         first_name: 'ashkan',
    //         last_name: 'taherabadi',
    //         email: 'aa@gmail.com',
    //         mobile: '090909090909',
    //     })
    //     newUser.addresses.push({
    //         title: 'خانه',
    //         state: 'تهران',
    //         city: 'تهران',
    //         address: 'خیابان .... کوچه ... واحد2',
    //         zip_code: '1234567890',
    //         full_name: 'اقای...',
    //         mobile: '0901901901'
    //     })
    //     await newUser.save()
    //     res.send({newUser})
    }
}

export default UsersController