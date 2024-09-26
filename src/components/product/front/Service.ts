import IComment from "../../comments/model/IComment";
import IProduct from "../model/IProduct";
import ProductFactory from "../ProductFactory";
import Factory from "./Factory";

export default class ProductService {
  private factory: Factory

  constructor(){
    this.factory = new Factory()
  }

  public async productsList(page: number): Promise<Array<Partial<IProduct>> | false>{
      const itemsPerPage = 10
      const offset = (page as number - 1) * itemsPerPage
    try {
      const allProducts =  await this.factory.getProductsList({}, ['category'], {itemsPerPage, offset})
      const productsTransform = this.factory.productTransformer().collection(allProducts)
      return productsTransform
    } catch (error) {
      return false
    }
  }

  public async productDetails(productId: string): Promise<false | Partial<IProduct>>{
    try {
      const product = await this.factory.getProductDetails(productId, ['category'])
      if(!product){
        return false
      }
      const productTransform = this.factory.productTransformer().transform(product)
      return productTransform
    } catch (error) {
      return false
    }
  }

  public async productComments(productId: string){
    try {
      const comments = await this.factory.getProductComments(productId, ['user', 'product'])
      if(!comments){
        return false
      }
      const commentsTansform = this.factory.commentTransformer().collection(comments)
      return commentsTansform
    } catch (error) {
      return false
    }
  }
}