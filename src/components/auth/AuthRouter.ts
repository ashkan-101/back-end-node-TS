import { Router } from "express";
import AuthController from "./AuthController";

const authRouter: Router = Router()
const authController = new AuthController()


export default authRouter