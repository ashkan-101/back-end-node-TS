import { Request, Response, NextFunction } from "express";
import Transformer from './Transformer'
import IProduct from "../product/model/IProduct";
import ITransformer from "../contracts/ITransformer";
import IProductRepository from "../product/repositories/IProductRepository";
import ProductMongoRepository from "../product/repositories/ProductMongoRepository";
import ProductStatus from "../product/model/productStatus";

class HomeController {
  private readonly transformer: ITransformer<IProduct>
  private readonly productRepository: IProductRepository

  constructor(){
    this.transformer = new Transformer()
    this.productRepository = new ProductMongoRepository()
  }

  public async list(req: Request, res: Response, next: NextFunction){
    try {
      const newests = await this.productRepository.findMany(
        {status: ProductStatus.PUBLISHED},
        ['category'], 
        {itemsPerPage:3, offset:0},
        {createdAt: -1})

      const bestSellers = await this.productRepository.findMany(
        {status: ProductStatus.PUBLISHED},
        ['category'], 
        {itemsPerPage:3, offset:0},
        {purchasedCount: -1})

      const mostViewed = await this.productRepository.findMany(
        {status: ProductStatus.PUBLISHED},
        ['category'], 
        {itemsPerPage:3, offset:0},
        {createdAt: -1})

      const populars = await this.productRepository.findMany(
        {status: ProductStatus.PUBLISHED},
        ['category'], 
        {itemsPerPage:3, offset:0},
        {totalScore: -1})

      res.send({
        newests: this.transformer.collection(newests),
        bestSellers: this.transformer.collection(bestSellers),
        mostViewed: this.transformer.collection(mostViewed),
        populars: this.transformer.collection(populars)
      })
    } catch (error) {
      next(error)
    }
  }
}

export default HomeController;
