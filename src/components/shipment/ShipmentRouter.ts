import { Router } from "express";
import ShipmentController from "./ShipmentController";
 
const shipmentControllerIntance = new ShipmentController()
const ShipmentRouter: Router = Router()

export default ShipmentRouter