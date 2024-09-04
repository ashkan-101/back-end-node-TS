"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Address_1 = __importDefault(require("./Address"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    totalOrders: { type: Number, default: 0 },
    wallet: { type: Number, default: 0 },
    addresses: { type: [Address_1.default] },
    createdAt: { type: Date, default: Date.now() }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
