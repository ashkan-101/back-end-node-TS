"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("./usersController"));
const usersControllerIntance = new usersController_1.default();
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', usersControllerIntance.index);
usersRouter.post('/', usersControllerIntance.createUser);
exports.default = usersRouter;
