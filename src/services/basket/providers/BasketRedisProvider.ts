import IProduct from "../../../components/product/model/IProduct";
import IBasket from "../contracts/IBasket";
import redisConnection from "../../../infrastructure/connections/redis";

export default class BasketRedisProvider implements IBasket {
  private key: string = ''
  public constructor(key: string){
    this.key = key
  }

  public add(product: IProduct): void {
    redisConnection.get(this.key).then((result) => {
      if(result){
        const items = JSON.parse(result as string)
        items.push(product)
        redisConnection.set(this.key, JSON.stringify(items))
        .then((result) => {})
        .catch((error) => {})
      }
    }).catch((error) => {
      console.log(`redis can not fetch basket items: ${error.message}`);
    })
  }

  public remove(product: IProduct): void {
    redisConnection.get(this.key).then((result) => {
      if(result){
        const items = JSON.parse(result as string)
        items.splice(items.indexOf(product), 1)
        redisConnection.set(this.key, JSON.stringify(items))
        .then((result) => {})
        .catch((error) => {})
      }
    }).catch((error) => {
      console.log(`redis can not fetch basket items: ${error.message}`);
    })
  }

  public async items(): Promise<IProduct[]> {
    const items = await this.getItems()
    return items
  }

  public async count(): Promise<number>{
    const items = await this.getItems()
    return items.length
  }

  public clear(): void {
    redisConnection.del(this.key)
  }

  public async total(): Promise<number>{
    const items = await this.getItems()
    return items.reduce((total: number, product: IProduct) => {return total + product.price}, 0)
  }

  public async has(product: IProduct): Promise<boolean>{
    const items = await this.getItems()
    return items.includes(product)
  }

  private async getItems(): Promise<IProduct[]>{
    const items = await redisConnection.get(this.key)
    .then((result) => {return result}).catch((error) => {return false})
    if(items){
      const decodedItems = JSON.parse(items as string)
      return decodedItems
    }
    return []
  }
}