import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import Service from "./Service";
import ServerException from "../../exceptions/ServerException";

class ProductController {
  private readonly service: Service

  constructor() {
    this.service = new Service()
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? +req.query.page : 1

      const allProducts = await this.service.productList(page)
      if(!allProducts){
        throw new ServerException('procces failed!')
      }
      res.status(200).send(allProducts);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newProductParams = {
        title: req.body.title,
        price: req.body.price,
        disCountedPrice: req.body.disCountedPrice,
        category: req.body.category,
        attributes: req.body.attributes,
        variations: req.body.variations,
        priceVariations: req.body.priceVariations,
        stock: req.body.stock,
      };

      const newProduct = await this.service.saveNewProduct(newProductParams);
      
      if(!newProduct){
        throw new ServerException('خطایی در ذخیره محصول در دیتابیس رخ داد ..لطفا بعدا امتحان کنید')
      }
      
      if (req.files) {
        const thumbnailFile: UploadedFile = req.files.thumbnail as UploadedFile;
        const galleryFiles: UploadedFile[] = req.files.gallery as UploadedFile[];
        const saveFiles = await this.service.saveFiles(newProduct._id as string, thumbnailFile, galleryFiles);
      }

      res.status(201).send({
        success: true,
        newProduct
      })
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
