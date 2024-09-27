import { UploadedFile } from "express-fileupload";
import IProduct from "../model/IProduct";
import Factory from "./Factory";


export default class Service {
  private readonly factory: Factory

  constructor(){
    this.factory = new Factory()
  }

  public async productList(page: number): Promise<Array<Partial<IProduct>> | false>{
    const itemsPerPage = 10
    const offset = (page as number - 1) * itemsPerPage
    try {
      const productList = await this.factory.getProductList({}, ['category'], {itemsPerPage, offset})
      return this.factory.transformCollection(productList)
    } catch (error) {
      return false
    }
  }

  public async saveNewProduct(params: Partial<IProduct>){
    try {
      const newProduct =  await this.factory.saveNewProduct(params)
      return newProduct
    } catch (error) {
      return false
    }
  }

  public async saveFiles(productId: string, thumbnail: UploadedFile, gallery: UploadedFile[]){
    try {
      const thumbnailName: string = await this.factory.uploadService().upload(thumbnail as UploadedFile)
      const galleryName: string[] = await this.factory.uploadService().uploadMany(gallery as UploadedFile[])
      const result = await this.factory.saveFiles(productId, {thumbnail: thumbnailName, gallery: galleryName})
      return result
    } catch (error: any) {
      return false
    }
  }
}