import { Request, Response, NextFunction } from "express"

class ShipmentController {
    private readonly shipmentRepository: IShipmentRepository
  constructor () {
    this.shipmentRepository = new ShipmentMongoRepository()
  }
}

export default ShipmentController