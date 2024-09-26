import { Request, Response } from "express";
import User from "../model/User";
import Service from "./Service";

class UsersController {
  private readonly service: Service;

  constructor() {
    this.service = new Service();
  }

  public async usersList(req: Request, res: Response) {
    const allUsers = await this.service.allUsers()

    res.status(200).send({
      success: true,
      allUsers
    });
  }
}

export default UsersController;
