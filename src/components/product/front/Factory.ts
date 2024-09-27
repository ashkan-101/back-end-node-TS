import CommentTransformer from "../../comments/CommentTransformer";
import CommentMongoRepository from "../../comments/repositories/CommentMongoRepository";
import ICommentRepository from "../../comments/repositories/ICommentRepository";
import IPagination from "../../contracts/IPagination";
import ITransformer from "../../contracts/ITransformer";
import IProduct from "../model/IProduct";
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import ProductTransformer from "./Transformer";

export default class Factory{
  private readonly productRepository: IProductRepository
  private readonly commentRepository: ICommentRepository
  private readonly productTransformer: ITransformer<IProduct>

  constructor(){
    this.productRepository = new ProductMongoRepository()
    this.commentRepository = new CommentMongoRepository()
    this.productTransformer = new ProductTransformer()
  }

  public async getProductsList(params:any ,relation?: string[],pagination?: IPagination){
    return this.productRepository.findMany(params, relation, pagination)
  }

  public async getProductDetails(id: string, relation?: string[]){
    return this.productRepository.findOne(id, relation)
  }

  public async getProductComments(productId: string, relations?: string[]){
    return await this.commentRepository.findByProduct(productId, relations)
  }

  public transform(product: IProduct){
    return this.productTransformer.transform(product)
  }

  public transformCollection(products: IProduct[]){
    return this.productTransformer.collection(products)
  }

  public commentTransformer(){
    const commentTransformer = new CommentTransformer()
    return commentTransformer
  }
}