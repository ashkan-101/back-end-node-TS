import express from "express";
import { Application } from "express";
import RouteService from "./router/routeservice";
import Bootstrap from "./bootstrap";
import ErrorHandler from "./middlewares/ErrorHandler";

class App {
    public app: Application
    public port: number
    private router: RouteService
    private bootstrap: Bootstrap
    
    constructor(port: number){
        this.app = express()
        this.port = port
        this.router = new RouteService(this.app)
        this.bootstrap = new Bootstrap(this.app)
    }

    public start(): void{
        this.bootstrap.initial()
        this.router.run()
        ErrorHandler(this.app)
        this.app.listen(this.port, () => {
            console.log('app is running ...');
        })
    }
}

export default App
