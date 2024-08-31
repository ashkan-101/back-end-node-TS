import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import IProductRepository from "./repositories/IProductRepository"
import ProductMongoRepository from "./repositories/ProductMongoRepository"
import UploadService from "../../services/UploadService"
import ProductTransformer from "./ProductTransformer"

class ProductController {
    private readonly productsRepository: IProductRepository
    private uploadService: UploadService
    private productsTransformer: ProductTransformer

    constructor(){
        this.productsRepository = new ProductMongoRepository()
        this.uploadService = new UploadService()
        this.productsTransformer = new ProductTransformer()
        this.index = this.index.bind(this) 
        this.create = this.create.bind(this) 
    }

    public async index(req: Request, res: Response){
        const allProducts = await this.productsRepository.findMany({})
        res.send(this.productsTransformer.collection(allProducts))
    }

    public async create(req: Request, res: Response){
        const newProductParams = {
            title: req.body.title,
            price: req.body.price,
            disCountedPrice: req.body.disCountedPrice,
            category: req.body.category,
            attributes: req.body.attributes,
            variations: req.body.product_variations,
            priceVariations: req.body.price_Variations,
            stock: req.body.stock
        }

        const newProduct = await this.productsRepository.create(newProductParams)
        
        if(req.files){

            const thumbnailFile: UploadedFile = req.files.thumbnail as UploadedFile
            const galleryFiles: UploadedFile[] = req.files.gallery as UploadedFile[]

            const thumbnailName: string = await this.uploadService.upload(thumbnailFile)
            const galleryName: string[] = await this.uploadService.uploadMany(galleryFiles)

            await this.productsRepository.updateOne({_id: newProduct._id}, {
                thumbnail: thumbnailName,
                gallery: galleryName
            })
        }
        res.send({newProduct})    
    }
}

export default ProductController