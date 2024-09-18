import IComment from "../comments/model/IComment";
import IProduct from "./model/IProduct";
import ProductFactory from "./ProductFactory";

export default class ProductService {
  private productFactory: ProductFactory

  constructor(productFactory: ProductFactory){
    this.productFactory = productFactory
  }

  public async productsList(page: number): Promise<Array<Partial<IProduct>> | false>{
      const itemsPerPage = 10
      const offset = (page as number - 1) * itemsPerPage
    try {
      const allProducts =  await this.productFactory.productRepository().findMany({}, ['category'], {itemsPerPage, offset})
      const productsTransform = this.productFactory.productTransformer().collection(allProducts)
      return productsTransform
    } catch (error) {
      return false
    }
  }

  public async productDetails(productId: string): Promise<false | Partial<IProduct>>{
    try {
      const product = await this.productFactory.productRepository().findOne(productId, ['category'])
      if(!product){
        return false
      }
      const productTransform = this.productFactory.productTransformer().transform(product)
      return productTransform
    } catch (error) {
      return false
    }
  }

  public async productComments(productId: string): Promise<false | Partial<IComment>>{
    try {
      const comments = await this.productFactory.commentRepository().findByProduct(productId, ['user', 'product'])
      if(!comments){
        return false
      }
      const commentsTansform = this.productFactory.commentTransformer().collection(comments)
      return commentsTansform
    } catch (error) {
      return false
    }
  }
}