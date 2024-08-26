import { Router } from "express";
import ProductsController from "./productsController";
 
const productControllerIntance = new ProductsController()
const ProductsRouter: Router = Router()

ProductsRouter.get('/', productControllerIntance.index)
ProductsRouter.post('/', productControllerIntance.create)





export default ProductsRouter