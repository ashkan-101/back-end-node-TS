import ICommentRepository from "./ICommentRepository";
import CommentModel from '../model/Comment'
import CommentStatus from "../model/CommentStatus";
import IComment from "../model/IComment";
import { FilterQuery } from "mongoose";

export default class CommentMongoRepository implements ICommentRepository {
  public async findOne(ID: string): Promise<IComment | null> {
    const comment = await CommentModel.findById(ID)
    return comment
  }

  public async findMany(params: any): Promise<IComment[]> {
    return CommentModel.find(params)
  } 

  public async create(params: any): Promise<IComment> {
    const newComment = await CommentModel.create({...params})
    return newComment.save()
  }

  public async updateOne(where: FilterQuery<IComment>, updateData: Partial<IComment>): Promise<boolean> {
    const updateComment = await CommentModel.updateOne(where, updateData)
    return updateComment.modifiedCount > 0
  }

  public async updateMany(where: any, updateData: any): Promise<any> {
    
  }

  public async deleteOne(where: any): Promise<any> {
    
  }

  public async deleteMany(where: any): Promise<any> {
    
  }

  public async findByProduct(ProductID: string, relations?: string[]): Promise<IComment[]> {
    const commentQuery = CommentModel.find({product: ProductID})
    if(relations && relations.length > 0){
      relations.forEach((relation) => {
        commentQuery.populate(relation)
      })
    }
    return await commentQuery.exec()
  }

}