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

  constructor(){
    this.productRepository = new ProductMongoRepository()
    this.commentRepository = new CommentMongoRepository()
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

  public productTransformer(){
    const productTransformer: ITransformer<IProduct> = new ProductTransformer()
    return productTransformer
  }
  public commentTransformer(){
    const commentTransformer = new CommentTransformer()
    return commentTransformer
  }
}