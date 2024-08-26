import { Document } from "mongoose";
import IAttributeCategory from "./IAttrubuteCategory";

export default interface ICategory extends Document {
  title: string,
  slug: string,
  groups: [IAttributeCategory]
}