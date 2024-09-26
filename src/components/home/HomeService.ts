import IFactory from "./contracts/IFactory";
import ProductStatus from "../product/model/productStatus";
import Factory from "./Factory";

export default class HomeService {
  private readonly factory: Factory

  constructor(){
    this.factory = new Factory()
  }

  public async list(){
    try {
      const newests = await this.factory.findProductsByStatus(
        ProductStatus.PUBLISHED,
        ['category'], 
        {itemsPerPage:3, offset:0},
        {createdAt: -1})

      const bestSellers = await this.factory.findProductsByStatus(
        ProductStatus.PUBLISHED,
        ['category'], 
        {itemsPerPage:3, offset:0},
        {purchasedCount: -1})

      const mostViewed = await this.factory.findProductsByStatus(
        ProductStatus.PUBLISHED,
        ['category'], 
        {itemsPerPage:3, offset:0},
        {createdAt: -1})

      const populars = await this.factory.findProductsByStatus(
        ProductStatus.PUBLISHED,
        ['category'], 
        {itemsPerPage:3, offset:0},
        {totalScore: -1})

        return {
          newests: this.factory.productTransformer().collection(newests),
          bestSellers: this.factory.productTransformer().collection(bestSellers),
          mostViewed: this.factory.productTransformer().collection(mostViewed),
          populars: this.factory.productTransformer().collection(populars)
        }

    } catch (error) {
      throw new Error('not found any product')
    }
  }
}