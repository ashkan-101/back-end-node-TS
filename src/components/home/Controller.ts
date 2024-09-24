import { Request, Response, NextFunction } from "express";
import HomeService from "./HomeService";

class HomeController {
  private readonly homeService: HomeService

  constructor(homeService: HomeService){
    this.homeService = homeService
  }

  public async list(req: Request, res: Response, next: NextFunction){
    try {
      const list = await this.homeService.list()

      res.status(200).send(list)
    } catch (error) {
      next(error)
    }
  }
}

export default HomeController;
