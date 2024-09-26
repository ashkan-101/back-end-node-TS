import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import ProductService from "./Service";
import ServerException from "../../exceptions/ServerException";
import NotFoundException from "../../exceptions/NotFoundException";


class ProductController {
  private readonly service: ProductService

  constructor(){
    this.service = new ProductService()

    this.list = this.list.bind(this);
    this.productDetails = this.productDetails.bind(this)
    this.comments = this.comments.bind(this)
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? +req.query.page : 1

      const allProducts = await this.service.productsList(page)
      if(!allProducts){
        throw new ServerException('دریافت محصولات با مشکل مواجه شد!')
      }
      res.status(200).send({
        success: true,
        allProducts
      })
    } catch (error) {
      next(error);
    }
  }

  public async productDetails(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id
    if(!isValidObjectId(productId)){
      throw new NotFoundException('product not found')
    }
    try {
      const product = await this.service.productDetails(productId)
      if(!product){
        throw new NotFoundException('محصول موردنظر یافت نشد!')
      }
      res.status(200).send({
        success: true,
        product
      })
    } catch (error) {
      next(error);
    }
  }

  public async comments(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id
    if(!isValidObjectId(productId)){
      throw new NotFoundException('product not found')
    }
    try {
      const commentsProduct = await this.service.productComments(productId)
      if(!commentsProduct){
        throw new ServerException('دریافت کامنت ها با مشکل مواجه شد!')
      }
      res.status(200).send({
        success: true,
        commentsProduct
      })
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
