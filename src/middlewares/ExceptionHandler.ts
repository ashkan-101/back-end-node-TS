import { Application, Request, Response, NextFunction } from "express";
import Exception from "../components/exceptions/Exception";

export default function ExceptionHandler(app: Application){
  app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status).send({
      status: error.status,
      code: error.name,
      message: error.message 
    })
  })
}