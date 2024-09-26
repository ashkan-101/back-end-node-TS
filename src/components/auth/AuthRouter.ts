import { Router } from "express";
import AuthController from "./AuthController";
import AuthFactory from "./AuthFactory";
import AuthService from "./AuthService";

const authRouter: Router = Router()
const authController = new AuthController()

authRouter.post('/login', authController.authenticate.bind(authController))
authRouter.post('/register', authController.register.bind(authController))
authRouter.post('/check', authController.check.bind(authController))

export default authRouter