import { Router } from "express";
import SettingsController from "./SettingsController";

const settingRouter: Router = Router()
const settingControllerInstance = new SettingsController()

settingRouter.get('/', settingControllerInstance.index)
settingRouter.post('/', settingControllerInstance.store)

export default settingRouter