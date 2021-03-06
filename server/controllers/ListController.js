import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import ListService from '../services/ListService'
import TaskService from '../services/TaskService.js'


let _listService = new ListService().repository
let _taskService = new TaskService().repository



export default class ListController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTasksByUserId)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getById(req, res, next) {
    try {
      let data = await _listService.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getAll(req, res, next) {
    try {

      let data = await _listService.find({})
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getTasksByUserId(req, res, next) {
    try {
      let tasks = await _taskService.find({ listId: req.params.id })
      res.send(tasks)
    } catch (error) { next(error) }
  }



  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _listService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _listService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted list")
    } catch (error) { next(error) }
  }


}