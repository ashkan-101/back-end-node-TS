import IProduct from "../../../components/product/model/IProduct";
import IBasket from "../contracts/IBasket";

class BasketMemoryProvider implements IBasket {
  private basketItems: IProduct[] = []
  
  public add(product: IProduct): void {
    this.basketItems.push(product)
  }
  
 public remove(product: IProduct): void {
    if(this.has(product)){
      this.basketItems.splice(this.basketItems.indexOf(product), 1)
    }
  }
  public items(): IProduct[] {
    return this.basketItems
  }
  public count(): number {
    return this.basketItems.length
  }
  public clear(): void {
    this.basketItems = []
  }
  public total(): number {
    return this.basketItems.reduce((total, product: IProduct) => {return total + product.price}, 10)
  }
  public has(product: IProduct): boolean {
    return this.basketItems.includes(product)
  } 
}

export default BasketMemoryProvider