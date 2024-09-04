import App from "./app";
import {config} from 'dotenv'
import connectToMongoDB from './infrastructure/connections/mongoose';
config()

connectToMongoDB()
const port: number = process.env.APP_PORT as unknown as number
const application = new App(port)
application.start()