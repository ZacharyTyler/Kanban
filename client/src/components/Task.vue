<template>
  <div class="task">
    <h3>{{propTask.description}}</h3>
    <button class="btn btn-dark" @click="removeTask()">Delete Task</button>

    <!-- <select v-model="selected">
      <option disabled value>Select a Task</option>
      <option v-for="list in lists" :key="list._id">{{list.title}}</option>
    </select>
    <span>
      <button class="btn btn-outline-dark" @submit="moveTask(list._id)">Moved: {{selected}}</button>
    </span>-->

    <div class="dropdown">
      <button
        class="btn btn-outline-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >Move Task</button>
      <div class="dropdown-menu">
        <div
          class="dropdown-item"
          v-for="list in lists"
          :key="list._id"
          @click="moveTask(list._id)"
        >{{list.title}}</div>
      </div>
    </div>

    <hr />
    <Comments v-for="comment in comments" :propComment="comment" :key="comment._id" />
    <form @submit.prevent="addComment()">
      <input type="text" placeholder="comment" v-model="newComment.content" required />
      <button class="btn btn-light" type="submit">Create Comment</button>
    </form>
  </div>
</template>


<script>
import Comments from "./Comment";

export default {
  name: "task",
  props: ["propTask"],
  data() {
    return {
      newComment: {
        taskId: this.propTask._id,
        boardId: this.$route.params.boardId,
        listId: this.propTask.listId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getComments", this.propTask._id);
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.propTask._id];
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.propTask);
    },
    moveTask(listId) {
      let payload = {
        oldId: this.propTask.listId,
        listId: listId,
        taskId: this.propTask._id
      };
      this.$store.dispatch("moveTask", payload);
    },
    //Comments Section
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
    }
  },
  components: { Comments }
};
</script>


<style scoped>
</style>