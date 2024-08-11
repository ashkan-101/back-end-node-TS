"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = __importDefault(require("./productsController"));
const usersControllerIntance = new productsController_1.default();
const ProductsRouter = (0, express_1.Router)();
ProductsRouter.get('/', usersControllerIntance.index);
exports.default = ProductsRouter;
