import { Router } from "express";
import HomeController from './Controller'
import Factory from "./Factory";
import HomeService from "./HomeService";
import IFactory from "./contracts/IFactory";

const factory: IFactory = new Factory()
const homeService = new HomeService(factory)
const controller = new HomeController(homeService)

const productsRouter: Router = Router()

productsRouter.get('/', controller.list)

export default productsRouter