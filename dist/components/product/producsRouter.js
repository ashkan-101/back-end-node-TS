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
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the product
 *               disCountedPrice:
 *                 type: number
 *                 format: float
 *                 description: Discounted price of the product
 *               category:
 *                 type: string
 *                 description: Category of the product
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the attribute
 *                     value:
 *                       type: string
 *                       description: Value of the attribute
 *               variations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the variation
 *                     value:
 *                       type: string
 *                       description: Value of the variation
 *               priceVariations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     variationId:
 *                       type: string
 *                       description: ID of the variation
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Price of the variation
 *               stock:
 *                 type: number
 *                 description: Stock quantity of the product
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image of the product
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: Gallery images of the product
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newProduct:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
ProductsRouter.post('/', productControllerIntance.create);
exports.default = ProductsRouter;
