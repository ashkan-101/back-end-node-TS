import ITransformer from "../contracts/ITransformer";
import IProduct from "./model/IProduct";
import ProductTransformer from "./front/Transformer";
import IProductRepository from "./repositories/IProductRepository";
import ProductMongoRepository from "./repositories/ProductMongoRepository";
import ICommentRepository from "../comments/repositories/ICommentRepository";
import CommentMongoRepository from "../comments/repositories/CommentMongoRepository";
import CommentTransformer from "../comments/CommentTransformer";
import IComment from "../comments/model/IComment";


export default class ProductFactory {

  public productRepository(): IProductRepository{
    return new ProductMongoRepository()
  }
  public productTransformer(): ITransformer<IProduct>{
    return new ProductTransformer()
  }
  public commentRepository(): ICommentRepository{
    return new CommentMongoRepository()
  }
  public commentTransformer(): ITransformer<IComment>{
    return new CommentTransformer()
  }
}