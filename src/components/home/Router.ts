import { Router } from "express";
import HomeController from './Controller'

const controller = new HomeController()

const productsRouter: Router = Router()

productsRouter.get('/', controller.list)

export default productsRouter