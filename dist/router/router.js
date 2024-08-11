"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routerengine {
    constructor() {
        this.routers = new Map();
    }
    registerRouter(route, router) {
        this.routers.set(route, router);
    }
    getRouters() {
        return this.routers;
    }
}
exports.default = Routerengine;
