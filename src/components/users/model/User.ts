import {Schema, model} from 'mongoose'
import IUser from './IUser'
import addressSchema from './Address'

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobile: {type: String, required: true, unique: true},
    totalOrders: {type: Number, default: 0},
    wallet: {type: Number, default: 0},
    addresses: {type: [addressSchema]},
    createdAt: {type: Date, default: Date.now()}
})

export default model<IUser>('User', userSchema)