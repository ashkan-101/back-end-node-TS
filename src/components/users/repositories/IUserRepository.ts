import IRepository from "../../contracts/IRepository";
import IUser from "../model/IUser";

export default interface IUserRepository extends IRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>
}