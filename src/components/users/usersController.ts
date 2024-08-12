import { Request, Response } from "express"
import User from "./model/User"

class UsersController {
    // constructor(){
    //     this.getUsers = this.getUsers.bind(this)
    // }

    public getUsers(req: Request, res: Response){
        res.send({allUsers: []})
    }

    public async createUser(req: Request, res: Response){
        const newUser = await User.create({
            first_name: 'ashkan',
            last_name: 'taherabadi',
            email: 'aa@gmail.com',
            mobile: '090909090909',
        })
        res.send({newUser})
    }
}

export default UsersController