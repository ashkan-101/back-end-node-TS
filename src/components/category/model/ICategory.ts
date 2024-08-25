import { Document } from "mongoose";
import IAttribute from "./IAttribute";

export default interface ICategory extends Document {
  title: string,
  slug: string,
  groups: [IAttribute]
}