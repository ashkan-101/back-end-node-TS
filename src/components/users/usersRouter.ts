import { Router } from "express";
import UsersController from "./usersController";
 
const usersControllerIntance = new UsersController()
const usersRouter: Router = Router()

usersRouter.get('/', usersControllerIntance.index)
usersRouter.post('/', usersControllerIntance.createUser)





export default usersRouter


