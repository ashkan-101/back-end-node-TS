import { Request, Response, NextFunction } from "express"
import IShipmentRepository from './repositories/IShipmentRepository'
import ShipmentMongoRepository from './repositories/ShipmentMongoRepository'

class ShipmentController {
    private readonly shipmentRepository: IShipmentRepository
  constructor () {
    this.shipmentRepository = new ShipmentMongoRepository()
  }
}

export default ShipmentController