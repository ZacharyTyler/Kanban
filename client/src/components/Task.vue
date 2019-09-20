<template>
  <div class="task">
    <div class="row-flex">
      <div class="col bg-dark">
        <div class="row-flex">
          <div class="col">
            <button
              class="btn btn-sm btn-outline-light btn-dark float-right"
              @click="removeTask()"
            >X</button>
            <div class="dropdown float-left">
              <button
                class="btn btn-sm btn-outline-light btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu">
                <div
                  class="dropdown-item"
                  v-for="list in lists"
                  :key="list._id"
                  @click="moveTask(list._id)"
                >{{list.title}}</div>
              </div>
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