import { Request, Response, NextFunction } from "express";
import SettingMongoRepository from "./repositories/SettingMongoRepository";
import ISettingRepository from './repositories/ISettingRepository'
import SettingTransformer from "./SettingTransformer";
import ITransformer from "../contracts/ITransformer";
import ISetting from "./model/ISetting";

class SettingsController {
  private readonly settingRepository: ISettingRepository
  private readonly settingTransformer: ITransformer<ISetting>

  constructor(){
    this.settingRepository = new SettingMongoRepository()
    this.settingTransformer = new SettingTransformer()

    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
  }

  public async index(req: Request, res: Response, next: NextFunction){
    try {
     const settings = await this.settingRepository.findMany({})
     const settingTransform = this.settingTransformer.collection(settings)

     res.send(settingTransform)
    } catch (error) {
      next(error)
    }
  }

  public async store(req: Request, res: Response, next: NextFunction){
    try {
      const newSettingParams = {
        title: req.body.title,
        key: req.body.key,
        value: req.body.value,
        scope: req.body.scope,
        version: req.body.version
      }

    const newSetting = await this.settingRepository.create(newSettingParams)
    if(newSetting){
      res.status(201).send({
        success: true,
        message: 'successfully added new setting'
      })
    }
    } catch (error) {
      next(error)
    }
  }
}

export default SettingsController