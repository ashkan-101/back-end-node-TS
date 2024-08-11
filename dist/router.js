"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterEngine {
    constructor(app) {
        this.routers = new Map();
        this.app = app;
    }
    registerRouter(route, router) {
        this.routers.set(route, router);
    }
    run() {
        this.routers.forEach((router, route) => {
            this.app.use(route, router);
        });
    }
}
exports.default = RouterEngine;
