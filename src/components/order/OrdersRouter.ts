import { Router } from "express";
import OrdersController from "./OrdersController";

const ordersRouter: Router = Router()
const ordersControllerInstance = new OrdersController()

ordersRouter.get('/', ordersControllerInstance.index)



export default ordersRouter