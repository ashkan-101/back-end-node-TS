import { Router } from "express";
import PaymentsController from "./PaymentsController";

const paymentsRouter: Router = Router()
const paymentsControllerInstance = new PaymentsController()

paymentsRouter.get('/', paymentsControllerInstance.index)

export default paymentsRouter