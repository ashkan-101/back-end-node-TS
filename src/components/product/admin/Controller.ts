import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import UploadService from "../../../services/UploadService";
import ProductTransformer from "./Transformer";

class ProductController {
  private readonly productsRepository: IProductRepository;
  private uploadService: UploadService;
  private productsTransformer: ProductTransformer;

  constructor() {
    this.productsRepository = new ProductMongoRepository();
    this.uploadService = new UploadService();
    this.productsTransformer = new ProductTransformer();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const allProducts = await this.productsRepository.findMany({});
      res.send(this.productsTransformer.collection(allProducts));
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
        category: req.body.disCountedPrice,
        attributes: req.body.attributes,
        variations: req.body.variations,
        priceVariations: req.body.priceVariations,
        stock: req.body.stock,
        status: req.body.status,
      };

      const newProduct = await this.productsRepository.create(newProductParams);

      if (req.files) {
        const thumbnailFile: UploadedFile = req.files.thumbnail as UploadedFile;
        const galleryFiles: UploadedFile[] = req.files
          .gallery as UploadedFile[];

        // const files = req.files as any as UploadedFile[]
        // // console.log(files);

        const thumbnailName: string = await this.uploadService.upload(
          thumbnailFile
        );
        const galleryName: string[] = await this.uploadService.uploadMany(
          galleryFiles
        );

        await this.productsRepository.updateOne(
          { _id: newProduct._id },
          {
            thumbnail: thumbnailName,
            gallery: galleryName,
          }
        );
      }
      res.status(201).send(newProduct);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
