import { Router } from "express";
import UsersController from './Controller';
 
const controller = new UsersController()
const usersRouter: Router = Router()

usersRouter.post('/:userID/addresses', controller.saveAddress)

export default usersRouter
