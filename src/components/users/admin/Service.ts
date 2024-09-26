import Factory from "./Factory";

export default class Service {
  private readonly Factory: Factory

  constructor(){
    this.Factory = new Factory()
  }

 public async allUsers(){
  const allUsers = await this.Factory.allUsers()
  return this.Factory.transformer().collection(allUsers)
 }
}