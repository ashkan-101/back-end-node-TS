import { Router } from "express";
import ProductsController from "./productsController";
 
const usersControllerIntance = new ProductsController()
const ProductsRouter: Router = Router()

ProductsRouter.get('/', usersControllerIntance.index)





export default ProductsRouter