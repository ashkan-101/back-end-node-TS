import IUser from './IUser'
import {Schema, model} from 'mongoose'
import addressSchema from './Address'

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobile: {type: String, unique: true},
    totalOrders: {type: Number, default: 0},
    wallet: {type: Number, default: 0},
    addresses: {type: [addressSchema], default: []},
    createdAt: {type: Date, default: Date.now()}
})

export default model<IUser>('User', userSchema)