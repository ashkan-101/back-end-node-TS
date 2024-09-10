import { Request, Response, NextFunction } from "express";
import ICommentRepository from "./repositories/ICommentRepository";
import CommentMongoRepository from "./repositories/CommentMongoRepository";

class CommentsController {
  private readonly commentsRepository: ICommentRepository

  constructor(){
    this.commentsRepository = new CommentMongoRepository()

    this.create = this.create.bind(this)
  }

  public async create(req: Request, res: Response, next: NextFunction){
    try {
      const commentParams = {
        user: req.body.user,
        product: req.body.product,
        title: req.body.title,
        body: req.body.body,
        isBuyer: req.body.isBuyer,
        adviceToBuy: req.body.adviceToBuy,
        status: req.body.status,
      }

      const newComment = await this.commentsRepository.create(commentParams)
      res.status(201).send({
        success: true,
        message: 'successfully to create new comment'
      })
    } catch (error) {
      next(error)
    }
  }
}

export default CommentsController