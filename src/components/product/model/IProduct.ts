import { Document } from "mongoose";
import ProductStatus from "./productStatus";
import IProductAttribute from "./IProductAttribute";
import IAttributeGroup from "./IAttributeGroup";
import IPriceVariation from "./IPriceVariation";
import IProductVariation from "./IProductVariation";

export default interface IProduct extends Document {
  title: string
  price: number
  disCountedPrice: number
  thumbnail?: string
  thumbnailUrl?: string
  gallery?: string[]
  galleryUrl?: string[]
  category: string
  attributes: IAttributeGroup[]
  variations: IProductVariation[]
  priceVariations: IPriceVariation[]
  created_at: Date
  updated_at: Date
 
  stock: number
  purchasedCount: number
  commentsCount: number
  totalScore: number
  viewsCount: number
  
  status: ProductStatus
}
