import { Router } from "express";
import Controller from './Controller'

const controller = new Controller()
const ProductsRouter: Router = Router()

ProductsRouter.get('/', controller.list)
ProductsRouter.get('/:id', controller.productDetails)
ProductsRouter.get('/:id/comments', controller.comments)




export default ProductsRouter