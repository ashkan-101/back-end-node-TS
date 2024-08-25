import { Request, Response, NextFunction } from "express"
import Category from "./model/Category"

class CategoryController {
  public async store(req: Request, res: Response, next: NextFunction){
    // const newCategory = await Category.create({
    //   ...req.body
    // })
    // return res.send(newCategory)

  return  res.send({
      success: true
    })
  }
}

export default CategoryController