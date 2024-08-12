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
    getUsers(req, res) {
        res.send({ allUsers: [] });
    }
    async createUser(req, res) {
        const newUser = await User_1.default.create({
            first_name: 'ashkan',
            last_name: 'taherabadi',
            email: 'aa@gmail.com',
            mobile: '090909090909',
        });
        res.send({ newUser });
    }
}
exports.default = UsersController;
