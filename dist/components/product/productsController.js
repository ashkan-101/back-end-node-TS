"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductMongoRepository_1 = __importDefault(require("./repositories/ProductMongoRepository"));
const UploadService_1 = __importDefault(require("../../services/UploadService"));
const ProductTransformer_1 = __importDefault(require("./ProductTransformer"));
class ProductController {
    constructor() {
        this.productsRepository = new ProductMongoRepository_1.default();
        this.uploadService = new UploadService_1.default();
        this.productsTransformer = new ProductTransformer_1.default();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }
    async index(req, res) {
        const allProducts = await this.productsRepository.findMany({});
        res.send(this.productsTransformer.collection(allProducts));
    }
    async create(req, res) {
        const newProductParams = {
            user: '66ba4a6e4bb4b33f2cc2a817',
            order: '66d990d7df9b58fdfc7a4647',
            amount: 23,
            method: 'zarinPal',
            reserve: '',
            refrence: '',
        };
        const newProduct = await this.productsRepository.create(newProductParams);
        if (req.files) {
            const thumbnailFile = req.files.thumbnail;
            const galleryFiles = req.files.gallery;
            // const files = req.files as any as UploadedFile[]
            // // console.log(files);
            const thumbnailName = await this.uploadService.upload(thumbnailFile);
            const galleryName = await this.uploadService.uploadMany(galleryFiles);
            await this.productsRepository.updateOne({ _id: newProduct._id }, {
                thumbnail: thumbnailName,
                gallery: galleryName
            });
        }
        res.send({ newProduct });
    }
}
exports.default = ProductController;
