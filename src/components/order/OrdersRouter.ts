import { Router } from "express";
import OrdersController from "./OrdersController";

const ordersRouter: Router = Router()
const ordersControllerInstance = new OrdersController()

ordersRouter.get('/', ordersControllerInstance.index)
ordersRouter.post('/', ordersControllerInstance.create)
ordersRouter.get('/:orderID', ordersControllerInstance.find)
ordersRouter.patch('/:orderID', ordersControllerInstance.updateStatus)



export default ordersRouter