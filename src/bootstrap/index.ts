import { setupSwagger } from "./swagger";
import { Application , static as expressStatic} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { join, resolve } from "path";

export default class Bootstrap{
  private app: Application
  
  constructor(app: Application){
    this.app = app
  }

  public initial(){
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(fileUpload())
    this.app.use(expressStatic(resolve(process.cwd(), 'public')))
    setupSwagger(this.app)
  }
}