import { Router } from "express";
import PaymentsController from "./Controller";

const paymentsRouter: Router = Router()
const Controller = new PaymentsController()

paymentsRouter.get('/gateways', Controller.gateWaysList)

export default paymentsRouter