import { Router } from "express";
// import Controller from "./Controller";
import Controller from './Controller'
import ProductFactory from "../ProductFactory";
import ProductService from "../productService";
 
// const controller= new Controller()

const productFactory = new ProductFactory()
const productService = new ProductService(productFactory)

const controller = new Controller(productService)
const ProductsRouter: Router = Router()

ProductsRouter.get('/', controller.list)
ProductsRouter.get('/:id', controller.productDetails)
ProductsRouter.get('/:id/comments', controller.comments)




export default ProductsRouter