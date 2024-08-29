import {config} from 'dotenv'
config()
import './infrastructure/connections/mongoose'
import App from "./app";
const port: number = process.env.APP_PORT as unknown as number
const application = new App(port)
application.start()