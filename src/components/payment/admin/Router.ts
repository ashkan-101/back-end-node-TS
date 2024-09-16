import { Router } from "express";
import PaymentsController from "./Controller";

const paymentsRouter: Router = Router()
const Controller = new PaymentsController()

paymentsRouter.get('/', Controller.index)
paymentsRouter.post('/', Controller.create)

export default paymentsRouter