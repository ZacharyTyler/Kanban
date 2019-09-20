<template>
  <Drag class="task" :transferData="{
oldId: propTask.listId,
        taskId: propTask._id
  }">
    <div class="row-flex">
      <div class="col bg-dark">
        <div class="row-flex">
          <div class="col">
            <button
              class="btn btn-sm btn-outline-light btn-dark float-right"
              @click="removeTask()"
            >X</button>
            <div class="float-left">
              <!-- move icon goes here -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex justify-content-center">
            <h3>{{propTask.description}}</h3>
          </div>
        </div>
        <hr />
        <Comments v-for="comment in comments" :propComment="comment" :key="comment._id" />
        <hr />
        <form class="justify-content-center d-flex" @submit.prevent="addComment()">
          <div class="input-group mb-3 mt-3 input-size">
            <input
              type="text"
              placeholder="Comment"
              class="form-control text-center"
              v-model="newComment.content"
              required
            />
            <div class="input-group-append">
              <button class="btn btn-sm btn-outline-light btn-dark" type="submit">Create</button>
            </div>
          </div>
        </form>
        <hr />
      </div>
    </div>
  </Drag>
</template>


<script>
import Vue from "vue";
import Comments from "./Comment";
import { Drag, Drop } from "vue-drag-drop";
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

    //Comments Section
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
    }
  },
  components: {
    Comments,
    Drag,
    Drop
  }
};
</script>


<style scoped>
</style>