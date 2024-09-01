import { Schema, model } from "mongoose";
import IShipment from "./IShipment";
import ShipmentStatus from "./ShipmentStatus";

const shipmentSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  order: {type: Schema.Types.ObjectId, ref: 'Order'},
  selectedDateTime: {type: Date, required: true},
  deliveredAt: {type: Date, default: null}, 
  note: {type: String, default: null},
  status: {type: Number, enum: ShipmentStatus, default: ShipmentStatus.PENDING}
})

export default model<IShipment>('Shipment', shipmentSchema)