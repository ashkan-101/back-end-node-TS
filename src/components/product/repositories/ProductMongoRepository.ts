import IProductRepository from "./IProductRepository";
import ProductModel from '../model/Product'
import ProductStatus from "../model/productStatus";
import IProduct from "../model/IProduct";
import { FilterQuery } from "mongoose";
import IPagination from "../../contracts/IPagination";

export default class ProductMongoRepository implements IProductRepository {
  public async findOne(ID: string, relations?: string[]): Promise<IProduct | null> {
    const productQuery = ProductModel.findById(ID)

    if(relations && relations.length > 0){
      relations.forEach((relation) => {
        productQuery.populate(relation)
      })
    }
    return await productQuery.exec()
  }

  public async findMany(params: any, relations?: string[], pagination?: IPagination, sort?:any): Promise<IProduct[]> {
    const productQuery = ProductModel.find(params)

    if(sort){
      productQuery.sort(sort)
    }
    
    if(relations && relations.length > 0){
      relations.forEach((relation) => {
        productQuery.populate(relation)
      })
    }
    if(pagination){
      productQuery.limit(pagination.itemsPerPage).skip(pagination.offset)
    }
    return await productQuery.exec()
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