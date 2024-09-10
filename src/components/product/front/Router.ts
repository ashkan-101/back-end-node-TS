import { Router } from "express";
import Controller from "./Controller";
 
const controller= new Controller()
const ProductsRouter: Router = Router()

ProductsRouter.get('/', controller.list)




export default ProductsRouter