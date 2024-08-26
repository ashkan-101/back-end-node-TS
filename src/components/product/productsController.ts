import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import path from "path"

class ProductController {

    constructor(){}

    public index(req: Request, res: Response){
        res.send({allProducts: []})
    }

    public create(req: Request, res: Response){
        if(req.files){
            const thumbnail: UploadedFile = req.files.thumbnail as UploadedFile
            thumbnail.mv(path.join(process.cwd(), `/uploads/${Math.random().toString(36).slice(3,8) + '-' + thumbnail.name}`))
            res.send({thumbnail})
        }
    }


}

export default ProductController