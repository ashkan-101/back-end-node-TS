import IAddress from "../model/IAddress";
import Factory from "./Factory";


export default class Service {
  private readonly Factory: Factory

  constructor(){ 
    this.Factory = new Factory()
  }

  public async updateUserAddrress(oldAddresses: IAddress[], address: IAddress, userId: string){
    let newAddresses = []
    if(oldAddresses?.length > 0){
      newAddresses = [...oldAddresses, {...address}]
    }else{
      newAddresses = [{...address}]
    }
    const updateAddress = await this.Factory.updateUserAddress(userId, newAddresses)
    return updateAddress
  }
}