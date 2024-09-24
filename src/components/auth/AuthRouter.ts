import { Router } from "express";
import AuthController from "./AuthController";
import AuthFactory from "./AuthFactory";
import AuthService from "./AuthService";

const authRouter: Router = Router()
const authFactory = new AuthFactory()
const authService = new AuthService(authFactory)
const authController = new AuthController(authService)

authRouter.post('/login', authController.authenticate.bind(authController))
authRouter.post('/register', authController.register.bind(authController))
authRouter.post('/check', authController.check.bind(authController))

export default authRouter