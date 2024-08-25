import { Router } from "express";
import CategoryController from "./CategoriesController";

const categoryControllerInstance = new CategoryController()
const categoryRouter: Router = Router()

categoryRouter.post('/', categoryControllerInstance.store)

export default categoryRouter

