"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ProductMongoRepository_1 = __importDefault(require("./repositories/ProductMongoRepository"));
class ProductController {
    constructor() {
        this.productsRepository = new ProductMongoRepository_1.default;
        this.index = this.index.bind(this);
    }
    async index(req, res) {
        const allProducts = await this.productsRepository.findMany({});
        res.send({ allProducts });
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
