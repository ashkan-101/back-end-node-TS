import UploadService from "../../../services/UploadService";
import IPagination from "../../contracts/IPagination";
import ITransformer from "../../contracts/ITransformer";
import IProduct from "../model/IProduct";
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import ProductTransformer from "./Transformer";
import { UploadedFile } from "express-fileupload";


export default class Factory {
  private readonly productRepository: IProductRepository
  private readonly productTransformer: ITransformer<IProduct>

  constructor(){
    this.productRepository = new ProductMongoRepository()
    this.productTransformer = new ProductTransformer
  }

  public getProductList(params:any ,relation?: string[],pagination?: IPagination){
    return this.productRepository.findMany(params, relation, pagination)
  }

  public async saveNewProduct(params: Partial<IProduct>): Promise<IProduct>{
    return await this.productRepository.create(params)
  }

  public async saveFiles(productId: string, updateParams: Partial<IProduct>){
    return await this.productRepository.updateOne({_id: productId}, updateParams)
  }

  public transform(product: IProduct){
    return this.productTransformer.transform(product)
  }

  public transformCollection(products: IProduct[]){
    return this.productTransformer.collection(products)
  }

  public uploadService(){
    return new UploadService()
  }
}