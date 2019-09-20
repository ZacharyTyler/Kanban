<template>
  <Drop class="list col-4 mt-4 p-2" @drop="moveTask">
    <div class="card bg-dark text-white mr-1 ml-1 kanban-board">
      <div class="row-flex">
        <div class="card-header col">
          <div class="row-flex">
            <button
              class="btn btn-sm btn-outline-light btn-dark float-right"
              @click="removeList()"
            >X</button>
          </div>
          <br />
          <div class="row-flex">
            <div class="col d-flex justify-content-center">
              <h1>{{propList.title}}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card-body">
          <Tasks v-for="task in tasks" :propTask="task" :key="task._id" />
        </div>
      </div>
      <div>
        <form class="justify-content-center d-flex" @submit.prevent="addTask()">
          <div class="input-group mb-4 input-size">
            <input
              type="text"
              class="form-control text-center"
              placeholder="Task"
              v-model="newTask.description"
              required
            />
            <div class="input-group-append">
              <button
                class="btn btn-sm btn-outline-light btn-dark"
                id="button-addon2"
                type="submit"
              >Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Drop>
</template>

<script>
import Vue from "vue";
import Tasks from "../components/Task";
import { Drag, Drop } from "vue-drag-drop";
export default {
  name: "list",
  props: ["propList"],
  data() {
    return {
      newTask: {
        boardId: this.$route.params.boardId,
        listId: this.propList._id,
        comments: []
      }
    };
  },
  mounted() {
    this.$store.dispatch("getTasks", this.propList._id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.propList._id];
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.newTask);
    },
    removeList() {
      this.$store.dispatch("removeList", this.propList);
    },
    moveTask(data) {
      this.$store.dispatch("moveTask", {
        data: data,
        listId: this.propList._id
      });
    }
  },
  components: {
    Tasks,
    Drag,
    Drop
  }
};
</script>

<style scoped>
.neg-margins {
  margin-left: -5px;
  margin-right: -5px;
}
</style>