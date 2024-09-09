"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const usersRouter_1 = __importDefault(require("../components/users/usersRouter"));
const producsRouter_1 = __importDefault(require("../components/product/producsRouter"));
const CategoryRouter_1 = __importDefault(require("../components/category/CategoryRouter"));
const OrdersRouter_1 = __importDefault(require("../components/order/OrdersRouter"));
const CouponsRouter_1 = __importDefault(require("../components/coupon/CouponsRouter"));
const PaymentsRouter_1 = __importDefault(require("../components/payment/PaymentsRouter"));
class RouteService {
    constructor(app) {
        this.app = app;
        this.router = new router_1.default();
        this.bindRouters();
    }
    bindRouters() {
        this.router.registerRouter('/api/v1/users', usersRouter_1.default);
        this.router.registerRouter('/api/v1/products', producsRouter_1.default);
        this.router.registerRouter('/api/v1/categories', CategoryRouter_1.default);
        this.router.registerRouter('/api/v1/orders', OrdersRouter_1.default);
        this.router.registerRouter('/api/v1/coupon', CouponsRouter_1.default);
        this.router.registerRouter('/api/v1/payments', PaymentsRouter_1.default);
    }
    run() {
        this.router.getRouters().forEach((router, route) => {
            this.app.use(route, router);
        });
    }
}
exports.default = RouteService;
