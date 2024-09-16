import { Router } from "express";
import OrdersController from "./Controller";

const ordersRouter: Router = Router()
const Controller= new OrdersController()


export default ordersRouter