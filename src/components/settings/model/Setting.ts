import { Schema, model } from "mongoose";
import ISetting from "./ISetting";
import SettingScope from "./SettingScope";

const settingSchema: Schema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  scope: {type: Number, enum: SettingScope, default: SettingScope.PRIVATE},
  version: { type: String, required: true },
})

export default model<ISetting>("Setting", settingSchema)