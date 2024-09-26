import { Router } from "express";
import UsersController from './Controller';
 
const controller = new UsersController()
const usersRouter: Router = Router()

usersRouter.get('/', controller.usersList.bind(controller))


export default usersRouter


