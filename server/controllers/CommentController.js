import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import CommentService from '../services/CommentService'


let _commentService = new CommentService().repository


export default class CommentController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)

      .get('', this.getAll)
      // .get('/:id', this.getById)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      let data = await _commentService.find({})
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _commentService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let data = await _commentService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      if (!data) {
        throw new Error("invalid id, you didn't say the magic word")
      } res.send("Successfully deleted comment")
    } catch (error) { next(error) }
  }
}