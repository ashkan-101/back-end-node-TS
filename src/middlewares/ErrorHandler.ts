import { Application, Request, Response, NextFunction } from "express";

export default function ErrorHandler(app: Application){
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(403).send({
      statusCode: 403,
      error: true,
      message: error.message
    })
  })
}