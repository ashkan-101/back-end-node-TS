import IRepository from "../../contracts/IRepository";
import IShipment from "../model/IShipment";

export default interface IProductRepository extends IRepository<IShipment> {
  
}