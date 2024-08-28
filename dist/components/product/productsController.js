"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductMongoRepository_1 = __importDefault(require("./repositories/ProductMongoRepository"));
class ProductController {
    constructor() {
        this.productsRepository = new ProductMongoRepository_1.default;
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }
    async index(req, res) {
        const allProducts = await this.productsRepository.findMany({});
        res.send({ allProducts });
    }
    async create(req, res) {
        const newProductParams = {
            title: req.body.title,
            price: req.body.price,
            disCountedPrice: req.body.disCountedPrice,
            // thumbnail: req.body.thumbnail,
            // gallery: req.body.gallery
            category: req.body.category,
            attributes: req.body.attributes,
            variations: req.body.product_variations,
            priceVariations: req.body.price_Variations,
            stock: req.body.stock
        };
        const newProduct = await this.productsRepository.create(newProductParams);
        res.send({ newProduct });
        // if(req.files){
        //     const thumbnail: UploadedFile = req.files.thumbnail as UploadedFile
        //     thumbnail.mv(path.join(process.cwd(), `/uploads/${Math.random().toString(36).slice(3,8) + '-' + thumbnail.name}`))
        //     res.send({thumbnail})
        // }
    }
}
exports.default = ProductController;
