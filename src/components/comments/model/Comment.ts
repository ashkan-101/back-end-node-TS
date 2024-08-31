import { Schema, model } from "mongoose";
import IComment from "./IComment";
import AdviceToBuy from "./AdviceToBuy";
import CommentStatus from "./CommentStatus";

const commentSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  title: {type: String, required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  isBuyer: {type: Boolean, default: false},
  adviceToBuy: {type: Number, enum: AdviceToBuy, default: AdviceToBuy.NOT_SURE},
  status: {type: Number, enum: CommentStatus, default: CommentStatus.PENDING}
})

export default model<IComment>('Comment', commentSchema)