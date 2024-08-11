import { Request, Response } from "express"

class ProductController {

    constructor(){}

    public index(req: Request, res: Response){
        res.send({allProducts: []})
    }


}

export default ProductController