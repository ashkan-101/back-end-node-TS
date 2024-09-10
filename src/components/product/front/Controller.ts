import { Request, Response, NextFunction } from "express"
import IProductRepository from "../repositories/IProductRepository"
import ProductMongoRepository from "../repositories/ProductMongoRepository"
import ProductTransformer from "./Transformer"

class ProductController {
    private readonly productsRepository: IProductRepository
    private productsTransformer: ProductTransformer

    constructor(){
        this.productsRepository = new ProductMongoRepository()
        this.productsTransformer = new ProductTransformer()
        
        this.list = this.list.bind(this) 
    }

    public async list(req: Request, res: Response, next: NextFunction){
        try {
            const allProducts = await this.productsRepository.findMany({})
            res.send(this.productsTransformer.collection(allProducts))
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController