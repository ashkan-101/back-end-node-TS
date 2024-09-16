import { Router } from "express";
import OrdersController from "./Controller";

const ordersRouter: Router = Router()
const Controller= new OrdersController()

ordersRouter.get('/', Controller.index)
ordersRouter.post('/', Controller.create)
ordersRouter.get('/:orderID', Controller.find)
ordersRouter.patch('/:orderID', Controller.updateStatus)



export default ordersRouter