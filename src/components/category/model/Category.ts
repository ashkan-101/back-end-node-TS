import { Schema, model } from "mongoose";
import ICategory from './ICategory'

const categorySchema: Schema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, required: true},
  groups: {type: [Object]}
})
categorySchema.set('toJSON', {
  virtuals: true
})

export default model<ICategory>("Category", categorySchema)