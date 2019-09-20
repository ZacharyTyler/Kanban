<template>
  <div class="board container">
    <div class="row">
      <div class="col">
        <button class="btn btn-dark float-right mb-3 cuz-rounded" @click="logout('success')">Logout</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 card bg-dark text-white justify-content-center d-flex kanban-board">
        <h1 class="card-header">{{board.title}}</h1>
        <h3 class="card-body margin-des">
          <i>{{board.description}}</i>
        </h3>
        <form class="card-footer justify-content-center d-flex" @submit.prevent="addList()">
          <div class="input-group mb-3 mt-3 input-size">
            <input
              type="text"
              class="form-control text-center"
              placeholder="List"
              v-model="newList.title"
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

    <!-- Lists -->
    <div class="row">
      <Lists v-for="list in lists" :propList="list" :key="list._id" />
    </div>
  </div>
</template>

<script>
import Lists from "../components/List";
import NotificationService from "../SweetAlerts/NotificationService";
import Swal from "sweetalert2";

export default {
  name: "board",
  props: ["boardId"],

  data() {
    return {
      newList: {
        title: "",
        boardId: this.$route.params.boardId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getLists", this.$route.params.boardId);
    this.$store.dispatch("getBoards");
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    board() {
      return (
        this.$store.state.boards.find(
          b => b._id == this.$route.params.boardId
        ) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },

  methods: {
    addList() {
      this.$store.dispatch("addList", this.newList);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  components: {
    Lists
  }
};
</script>

<style>
* {
  font-family: "Merienda One", cursive;
}
.cuz-rounded {
  border-radius: 10px;
}
.input-size {
  width: 60%;
}
.margin-des {
  margin-bottom: -2px;
}
</style>
