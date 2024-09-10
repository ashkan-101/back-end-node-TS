import { Router } from "express";
import Controller from './CommentsController'

const commentsRouter: Router = Router()
const controller = new Controller()

commentsRouter.post('/', controller.create)

export default commentsRouter