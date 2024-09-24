import IFactory from "./contracts/IFactory";
import IProduct from "../product/model/IProduct";
import ITransformer from "../contracts/ITransformer";
import ProductTransformer from "./Transformer";
import IProductRepository from "../product/repositories/IProductRepository";
import ProductMongoRepository from "../product/repositories/ProductMongoRepository";



export default class Factory implements IFactory{
  public productRepository(): IProductRepository{
    const productRepository: IProductRepository = new ProductMongoRepository()
    return productRepository
  }

  public productTransformer(): ITransformer<IProduct>{
    const productTransformer: ITransformer<IProduct> = new ProductTransformer()
    return productTransformer
  }
}