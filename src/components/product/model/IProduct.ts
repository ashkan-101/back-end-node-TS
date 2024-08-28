import { Document } from "mongoose";
import ProductStatus from "./productStatus";
import IProductAttribute from "./IProductAttribute";
import IAttributeGroup from "./IAttributeGroup";
import IPriceVariation from "./IPriceVariation";
import IProductVariation from "./IProductVariation";

export default interface IProduct extends Document {
  title: string;
  price: number;
  disCountedPrice: number;
  thumbnail?: string;
  gallery?: [string];
  category: string;
  attributes: [IAttributeGroup];
  variations: [IProductVariation];
  priceVariations: [IPriceVariation];
  created_at: Date;
  updated_at: Date;
  stock: number;
  status: ProductStatus;
}
