import mongoose from "mongoose"
import CommentService from "./CommentService"

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _commentRepo = new CommentService().repository

let _schema = new Schema({
  // title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  comments: [{ type: ObjectId, ref: 'Comment', required: true }]
}, { timestamps: true })

_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _commentRepo.deleteMany({ taskId: this._conditions._id })

  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class TaskService {
  get repository() {
    return mongoose.model('Task', _schema)
  }
}