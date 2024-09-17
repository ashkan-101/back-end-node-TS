import { Router } from "express";
import OrdersController from "./Controller";
import { auth } from '../../middlewares/Auth'

const ordersRouter: Router = Router()
const Controller= new OrdersController()

ordersRouter.use(auth)
ordersRouter.post('/', Controller.purchaseOrder)

export default ordersRouter