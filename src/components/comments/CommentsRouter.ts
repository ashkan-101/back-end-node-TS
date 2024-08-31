import { Router } from "express";
import CommentsController from './CommentsController'

const commentsRouter: Router = Router()
const commentControllerInstance = new CommentsController()

export default commentsRouter