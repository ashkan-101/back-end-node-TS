import IProduct from "../product/model/IProduct";
import ITransformer from "../contracts/ITransformer";
import ProductTransformer from "./Transformer";
import IProductRepository from "../product/repositories/IProductRepository";
import ProductMongoRepository from "../product/repositories/ProductMongoRepository";
import ProductStatus from "../product/model/productStatus";
import IPagination from "../contracts/IPagination";



export default class Factory{
  private readonly productRepository: IProductRepository

  constructor(){
    this.productRepository = new ProductMongoRepository()
  }
  
  public async findProductsByStatus(status: ProductStatus, relation?: string[], pagination?: IPagination, sort?: any): Promise<IProduct[]>{
    const productResult: IProduct[] = await this.productRepository.findMany({status: status}, relation, pagination, sort)
    return productResult
  }

  public productTransformer(): ITransformer<IProduct>{
    const productTransformer: ITransformer<IProduct> = new ProductTransformer()
    return productTransformer
  }
}