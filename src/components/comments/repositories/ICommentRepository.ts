import IRepository from "../../contracts/IRepository";
import IComment from "../model/IComment";

export default interface ICommentRepository extends IRepository<IComment>{
  findByProduct(ProductID: string, relations?: string[]): Promise<IComment[]>
} 