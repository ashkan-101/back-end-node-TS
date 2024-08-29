import IProductRepository from "./IProductRepository";
import ProductModel from '../model/Product'
import ProductStatus from "../model/productStatus";
import IProduct from "../model/IProduct";
import { FilterQuery } from "mongoose";

export default class ProductMongoRepository implements IProductRepository {
  public async findOne(ID: string): Promise<IProduct | null> {
    const product = await ProductModel.findById(ID)
    return product
  }

  public async findMany(params: any): Promise<IProduct[]> {
    return ProductModel.find(params)
  } 

  public async findByStatus(status: ProductStatus): Promise<IProduct[]> {
    return ProductModel.find({ status })
  }

  public async create(params: any): Promise<IProduct> {
    const newProduct = await ProductModel.create({...params})
    return newProduct.save()
  }

  public async updateOne(where: FilterQuery<IProduct>, updateData: Partial<IProduct>): Promise<boolean> {
    const updateProduct = await ProductModel.updateOne(where, updateData)
    return updateProduct.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}