import { Router } from "express";
import AuthController from "./AuthController";

const authRouter: Router = Router()
const authController = new AuthController()

authRouter.post('/login', authController.authenticate)
authRouter.post('/register', authController.register)

export default authRouter