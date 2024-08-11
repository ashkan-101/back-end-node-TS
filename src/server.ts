import {config} from 'dotenv'
config()
import './infrastructure/connections/mongoose'
import App from "./app";
const port: number = 9090
const application = new App(port)
application.start()