import { Schema, model } from "mongoose";
import ICategory from './ICategory'

const categorySchema: Schema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, required: true},
  groups: {type: [Object]}
})

export default model<ICategory>("Category", categorySchema)