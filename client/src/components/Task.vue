<template>
  <div class="task">
    <h3>{{propTask.description}}</h3>
    <button class="btn btn-dark" @click="removeTask()">Delete Task</button>
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
        taskId: this.propTask._id
      }
    };
  },
  mounted() {
    this.$store.dispatch("getComments", this.propTask._id);
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.propTask._id];
    }
  },
  methods: {
    removeTask() {
      this.$store.dispatch("removeTask", this.propTask);
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