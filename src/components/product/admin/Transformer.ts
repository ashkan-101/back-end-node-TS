import ITransformer from "../../contracts/ITransformer";
import IProduct from "../model/IProduct";
import DateService from '../../../services/DateService'

export default class ProductTransformer implements ITransformer<IProduct> {
  private readonly dateService: DateService

  constructor(){
    this.dateService = new DateService()
  }

  public transform(item: IProduct){
    return {
      id: item._id,
      title: item.title,
      thumbnail: item.thumbnailUrl,
      price: item.price,
      discountedPrice: item.disCountedPrice,
      createdAt: this.dateService.toPersian(item.created_at.toUTCString()),
      updatedAt: this.dateService.toPersian(item.updated_at.toUTCString()),
      gallery: item.galleryUrl,
      stock: item.stock,
      status: item.status
    }
  }
  
  public collection(items: IProduct[]){
    return items.map((item: IProduct) => this.transform(item))
  };
}