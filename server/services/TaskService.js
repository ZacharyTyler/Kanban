import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  comments: [{ type: ObjectId, ref: 'Comment', required: true }]
}, { timestamps: true })

export default class TaskService {
  get repository() {
    return mongoose.model('Task', _schema)
  }
}