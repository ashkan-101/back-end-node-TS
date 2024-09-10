"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const usersRouter_1 = __importDefault(require("../components/users/usersRouter"));
const Router_1 = __importDefault(require("../components/product/admin/Router"));
const Router_2 = __importDefault(require("../components/product/front/Router"));
const CategoryRouter_1 = __importDefault(require("../components/category/CategoryRouter"));
const OrdersRouter_1 = __importDefault(require("../components/order/OrdersRouter"));
const CouponsRouter_1 = __importDefault(require("../components/coupon/CouponsRouter"));
const PaymentsRouter_1 = __importDefault(require("../components/payment/PaymentsRouter"));
const SettingsRouter_1 = __importDefault(require("../components/settings/SettingsRouter"));
class RouteService {
    constructor(app) {
        this.app = app;
        this.router = new router_1.default();
        this.bindRouters();
    }
    bindRouters() {
        //admin
        this.router.registerRouter('/api/v1/admin/products', Router_1.default);
        //front
        this.router.registerRouter('/api/v1/users', usersRouter_1.default);
        this.router.registerRouter('/api/v1/products', Router_2.default);
        this.router.registerRouter('/api/v1/categories', CategoryRouter_1.default);
        this.router.registerRouter('/api/v1/orders', OrdersRouter_1.default);
        this.router.registerRouter('/api/v1/coupons', CouponsRouter_1.default);
        this.router.registerRouter('/api/v1/payments', PaymentsRouter_1.default);
        this.router.registerRouter('/api/v1/settings', SettingsRouter_1.default);
    }
    run() {
        this.router.getRouters().forEach((router, route) => {
            this.app.use(route, router);
        });
    }
}
exports.default = RouteService;
