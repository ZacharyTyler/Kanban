import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import TaskService from '../services/TaskService'
import CommentService from '../services/CommentService'


let _taskService = new TaskService().repository
let _commentService = new CommentService().repository


export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)

      .get('', this.getAll)
      .get('/:id/comments', this.getComments)
      // .get('/:id', this.getById)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {

      let data = await _taskService.find({ listId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getComments(req, res, next) {
    try {

      let data = await _commentService.find({ listId: req.params.id })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _taskService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted task")
    } catch (error) { next(error) }
  }
}