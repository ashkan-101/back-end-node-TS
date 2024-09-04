"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("./infrastructure/connections/mongoose"));
(0, dotenv_1.config)();
(0, mongoose_1.default)();
const port = process.env.APP_PORT;
const application = new app_1.default(port);
application.start();
