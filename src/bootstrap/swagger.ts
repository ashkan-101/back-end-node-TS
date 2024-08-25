import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import { config } from "dotenv";
import { Application } from "express";
config()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API information'
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT}`
      }
    ]
  },
  apis: ['./src/components/**/*Router.ts']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export function setupSwagger(app: Application){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}