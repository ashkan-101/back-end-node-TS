import IProductRepository from "./IProductRepository";
import ProductModel from '../model/Product'
import ProductStatus from "../model/productStatus";

export default class ProductMongoRepository implements IProductRepository {
  public async findOne(ID: string): Promise<any> {
    const product = await ProductModel.findById(ID)
    return product
  }

  public async findMany(params: any): Promise<any> {
    return ProductModel.find(params)
  } 

  public async findByStatus(status: ProductStatus): Promise<any> {
    return ProductModel.find({status})
  }

  public async create(params: any): Promise<any> {
    const newProduct = await ProductModel.create({...params})
    return newProduct.save()
  }

  public async updateOne(where: any, updateData: any): Promise<any> {
    
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }
}