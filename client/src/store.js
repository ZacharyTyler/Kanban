import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import NotificationService from "./SweetAlerts/NotificationService"
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}


  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state, user) {
      state.user = {}
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        NotificationService.toastError(e)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async removeBoard({ dispatch }, boardId) {

      try {
        let res = await api.delete(`boards/${boardId}`, boardId)
        dispatch('getBoards')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    async getLists({ commit }, boardId) {
      try {
        let res = await api.get("boards/" + boardId + "/lists")
        commit('setLists', res.data)
      } catch (error) {
        console.error(error)
      }
    },


    async addList({ dispatch }, listData) {
      try {
        let res = await api.post('lists', listData)
        dispatch('getLists', listData.boardId)

      } catch (error) {
        console.error(error)
      }
    },

    async removeList({ dispatch }, listData) {
      try {
        let res = await api.delete(`lists/${listData._id}`, listData)
        dispatch('getLists', listData.boardId)
      } catch (error) {
        console.error(error)
      }
    },


    //#endregion


    //#region -- TASKS --

    async getTasks({ commit }, listId) {
      try {

        let res = await api.get("lists/" + listId + "/tasks")
        commit('setTasks', { tasks: res.data, listId })
      } catch (error) {
        console.error(error)
      }
    },

    async addTask({ dispatch }, taskData) {
      try {

        let res = await api.post('tasks', taskData)
        dispatch('getTasks', taskData.listId)
      } catch (error) {
        console.error(error)
      }
    },

    async removeTask({ dispatch }, taskData) {
      try {
        let res = await api.delete(`tasks/${taskData._id}`, taskData)
        dispatch('getTasks', taskData.listId)
      } catch (error) {
        console.error(error)
      }
    },
    async moveTask({ dispatch }, payload) {
      try {
        let res = await api.put(`tasks/${payload.data.taskId}`, payload)
        dispatch('getTasks', payload.data.oldId)
        dispatch('getTasks', payload.listId)
      } catch (error) {
        console.error(error)
      }
    },

    //#endregion

    //#region -- Comments --
    async getComments({ commit }, taskId) {
      try {
        let res = await api.get(`tasks/` + taskId + `/comments`)
        commit('setComments', { comments: res.data, taskId })
      } catch (error) {
        console.error(error)
      }
    },

    async addComment({ dispatch }, commentData) {
      try {
        let res = await api.post('comments', commentData)
        dispatch('getComments', commentData.taskId)
      } catch (error) {
        console.error(error)
      }
    },
    async removeComment({ dispatch }, commentData) {

      try {
        let res = await api.delete(`comments/${commentData._id}`, commentData)
        dispatch('getComments', commentData.taskId)
      } catch (error) {
        console.error(error)
      }
    },


    //#endregion

    //#region -- Toasts --

    //#endregion
  }
})
