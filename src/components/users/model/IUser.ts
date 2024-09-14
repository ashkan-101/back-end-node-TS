import { Document } from "mongoose";
import IAddress from "./IAddress";

export default interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  totalOrders: number;
  wallet: number;
  addresses: object[]
  createdAt: Date;
  
  constraints: any
}

