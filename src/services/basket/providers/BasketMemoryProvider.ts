import IProduct from "../../../components/product/model/IProduct";
import IBasket from "../contracts/IBasket";

class BasketMemoryProvider implements IBasket {
  private basketItems: IProduct[] = []
  
  public add(product: IProduct): void {
    this.basketItems.push(product)
  }
  
 public async remove(product: IProduct): Promise<void> {

    if(await this.has(product)){
      this.basketItems.splice(this.basketItems.indexOf(product), 1)
    }
  }
  public items(): Promise<IProduct[]> {
    return Promise.resolve(this.basketItems)
  }
  public count(): Promise<number> {
    return Promise.resolve(this.basketItems.length)
  }
  public clear(): void {
    this.basketItems = []
  }
  public total(): Promise<number> {
    const totalBasket = this.basketItems.reduce((total, product: IProduct) => {return total + product.price}, 10)
    return Promise.resolve(totalBasket)
  }
  public has(product: IProduct): Promise<boolean> {
    return Promise.resolve(this.basketItems.includes(product))
  }  
}

export default BasketMemoryProvider