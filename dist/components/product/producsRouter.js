"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = __importDefault(require("./productsController"));
const productControllerIntance = new productsController_1.default();
const ProductsRouter = (0, express_1.Router)();
ProductsRouter.get('/', productControllerIntance.index);
ProductsRouter.post('/', productControllerIntance.create);
exports.default = ProductsRouter;
