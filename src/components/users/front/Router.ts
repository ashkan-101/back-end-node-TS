import { Router } from "express";
import UsersController from './Controller';
import { auth } from "../../../middlewares/Auth";
 
const controller = new UsersController()
const usersRouter: Router = Router()

usersRouter.use(auth)
usersRouter.post('/addresses', controller.saveAddress.bind(controller))

export default usersRouter
