import { Request, Response, NextFunction } from "express";
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import ProductTransformer from "./Transformer";
import NotFoundException from "../../exceptions/NotFoundException";
import { isValidObjectId } from "mongoose";
import ICommentRepository from "../../comments/repositories/ICommentRepository";
import CommentMongoRepository from "../../comments/repositories/CommentMongoRepository";
import CommentTransformer from "../../comments/CommentTransformer";


class ProductController {
  private readonly productsRepository: IProductRepository;
  private readonly productsTransformer: ProductTransformer;

  constructor() {
    this.productsRepository = new ProductMongoRepository();
    this.productsTransformer = new ProductTransformer();

    this.list = this.list.bind(this);
    this.productDetails = this.productDetails.bind(this)
    this.comments = this.comments.bind(this)
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page || 1
      const itemsPerPage = 10
      const offset = (page as number - 1) * itemsPerPage

      const allProducts = await this.productsRepository.findMany({},['category'],{itemsPerPage, offset});
      res.send(this.productsTransformer.collection(allProducts));

    } catch (error) {
      next(error);
    }
  }

  public async productDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id
      if(!isValidObjectId(productId)){
        throw new NotFoundException('product not found')
      }
      
      const product = await this.productsRepository.findOne(productId, ['category'])

      if(!product){
        throw new NotFoundException('product not found')
      }

      const productTransform = this.productsTransformer.transform(product)
      res.status(200).send(productTransform)

    } catch (error) {
      next(error);
    }
  }

  public async comments(req: Request, res: Response, next: NextFunction) {
    try {
      const commentTransformer = new CommentTransformer()
      const commentsRepository: ICommentRepository = new CommentMongoRepository()

      const productId = req.params.id
      if(!isValidObjectId(productId)){
        throw new NotFoundException('product not found')
      }
      
      const commentsProduct = await commentsRepository.findByProduct(productId, ['user', 'product'])

      if(!commentsProduct){
        throw new NotFoundException('product not found')
      }

      const transformComment = commentTransformer.collection(commentsProduct)
      res.status(200).send(transformComment)

    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
