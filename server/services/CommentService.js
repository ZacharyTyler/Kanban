import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  content: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },

}, { timestamps: true })

export default class CommentService {
  get repository() {
    return mongoose.model('Comment', _schema)
  }
}