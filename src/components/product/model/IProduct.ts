import { Document } from "mongoose";
import ProductStatus from "./productStatus";
import IProductAttribute from "./IProductAttribute";

export default interface IProduct extends Document {
  title: string;
  price: number;
  disCountedPrice: number;
  thumbnail?: string;
  gallery?: [string];
  category: string;
  attributes: [object];
  variations: [object];
  priceVariations: [object];
  created_at: Date;
  updated_at: Date;
  stock: number;
  status: ProductStatus;
}
