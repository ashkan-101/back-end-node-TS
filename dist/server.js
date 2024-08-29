"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
require("./infrastructure/connections/mongoose");
const app_1 = __importDefault(require("./app"));
const port = process.env.APP_PORT;
const application = new app_1.default(port);
application.start();
