import { Router } from "express";
import CategoryController from "./CategoriesController";

const categoryControllerInstance = new CategoryController()
const categoryRouter: Router = Router()

categoryRouter.post('/', categoryControllerInstance.store)
categoryRouter.get('/', categoryControllerInstance.list)
categoryRouter.get('/:id/attributes', categoryControllerInstance.attributes)

export default categoryRouter

