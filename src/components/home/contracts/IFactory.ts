import IProduct from "../../product/model/IProduct";
import ITransformer from "../../contracts/ITransformer";
import IProductRepository from "../../product/repositories/IProductRepository";

export default interface IFactory {
  productRepository: IProductRepository
  productTransformer(): ITransformer<IProduct>
}