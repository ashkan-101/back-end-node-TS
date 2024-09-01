"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeservice_1 = __importDefault(require("./router/routeservice"));
const bootstrap_1 = __importDefault(require("./bootstrap"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.router = new routeservice_1.default(this.app);
        this.bootstrap = new bootstrap_1.default(this.app);
    }
    start() {
        this.bootstrap.initial();
        this.router.run();
        (0, ErrorHandler_1.default)(this.app);
        this.app.listen(this.port, () => {
            console.log('app is running ...');
        });
    }
}
exports.default = App;
