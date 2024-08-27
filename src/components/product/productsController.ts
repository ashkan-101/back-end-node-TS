import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"

import path from "path"
import IProduct from "./model/IProduct"
import IProductRepository from "./repositories/IProductRepository"
import ProductMongoRepository from "./repositories/ProductMongoRepository"

class ProductController {
    private productsRepository: IProductRepository
    constructor(){
        this.productsRepository = new ProductMongoRepository
        this.index = this.index.bind(this) 
    }

    public async index(req: Request, res: Response){
        const allProducts = await this.productsRepository.findMany({})
        res.send({ allProducts })
    }

    public create(req: Request, res: Response){
        if(req.files){
            const thumbnail: UploadedFile = req.files.thumbnail as UploadedFile
            thumbnail.mv(path.join(process.cwd(), `/uploads/${Math.random().toString(36).slice(3,8) + '-' + thumbnail.name}`))
            res.send({thumbnail})
        }
    }


}

export default ProductController