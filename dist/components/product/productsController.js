"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class ProductController {
    constructor() { }
    index(req, res) {
        res.send({ allProducts: [] });
    }
    create(req, res) {
        if (req.files) {
            const thumbnail = req.files.thumbnail;
            thumbnail.mv(path_1.default.join(process.cwd(), `/uploads/${Math.random().toString(36).slice(3, 8) + '-' + thumbnail.name}`));
            res.send({ thumbnail });
        }
    }
}
exports.default = ProductController;
