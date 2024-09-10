import { Request, Response, NextFunction } from "express";
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import ProductTransformer from "./Transformer";
import NotFoundException from "../../exceptions/NotFoundException";
import { isValidObjectId } from "mongoose";

class ProductController {
  private readonly productsRepository: IProductRepository;
  private productsTransformer: ProductTransformer;

  constructor() {
    this.productsRepository = new ProductMongoRepository();
    this.productsTransformer = new ProductTransformer();

    this.list = this.list.bind(this);
    this.productDetails = this.productDetails.bind(this)
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page || 1
      const itemsPerPage = 10
      const offset = (page as number - 1) * itemsPerPage

      const allProducts = await this.productsRepository.findMany({},[],{itemsPerPage, offset});
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
      
      const product = await this.productsRepository.findOne(productId)

      if(!product){
        throw new NotFoundException('product not found')
      }

      const productTransform = this.productsTransformer.transform(product)
      res.status(200).send(productTransform)

    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
