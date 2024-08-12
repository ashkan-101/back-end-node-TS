"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./model/User"));
class UsersController {
    // constructor(){
    //     this.getUsers = this.getUsers.bind(this)
    // }
    async index(req, res) {
        const users = await User_1.default.find();
        res.send({ users });
    }
    async createUser(req, res) {
        const newUser = await User_1.default.create({
            first_name: 'ashkan',
            last_name: 'taherabadi',
            email: 'aa@gmail.com',
            mobile: '090909090909',
        });
        newUser.addresses.push({
            title: 'خانه',
            state: 'تهران',
            city: 'تهران',
            address: 'خیابان .... کوچه ... واحد2',
            zip_code: '1234567890',
            full_name: 'اقای...',
            mobile: '0901901901'
        });
        await newUser.save();
        res.send({ newUser });
    }
}
exports.default = UsersController;
