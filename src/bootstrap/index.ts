import { setupSwagger } from "./swagger";
import { Application } from "express";
import cors from 'cors'
import bodyParser from "body-parser";

export default class Bootstrap{
  private app: Application
  
  constructor(app: Application){
    this.app = app
  }

  public initial(){
    this.app.use(cors())
    this.app.use(bodyParser.json())
    setupSwagger(this.app)
  }
}