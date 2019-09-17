<template>
  <div class="list border col-4 m-2 p-2">
    <h1>{{propList.title}}</h1>
    <div class="row">
      <Tasks v-for="task in tasks" :propTask="task" :key="task._id" />
    </div>
    <form @submit.prevent="addTask()">
      <input type="text" placeholder="title" v-model="newTask.description" required />
      <button class="btn btn-light" type="submit">Create Task</button>
    </form>
    <button class="btn btn-dark" @click="removeList()">Delete</button>
  </div>
</template>

<script>
import Tasks from "../components/Task";
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
    }
  },
  components: {
    Tasks
  }
};
</script>

<style scoped>
</style>