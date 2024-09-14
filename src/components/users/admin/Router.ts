import { Router } from "express";
import UsersController from './controller';
 
const controller = new UsersController()
const usersRouter: Router = Router()

usersRouter.get('/', controller.index)
usersRouter.post('/', controller.createUser)

export default usersRouter


