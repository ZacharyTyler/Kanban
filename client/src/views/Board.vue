<template>
  <div class="board">
    <button class="btn btn-dark" @click="logout()">Logout</button>
    <h1>{{board.title}}</h1>
    <h3>{{board.description}}</h3>
    <form @submit.prevent="addList()">
      <input type="text" placeholder="title" v-model="newList.title" required />
      <button class="btn btn-light" type="submit">Create List</button>
    </form>
    <div class="row">
      <Lists v-for="list in lists" :propList="list" :key="list._id" />
    </div>
  </div>
</template>

<script>
import Lists from "../components/List";
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
        //FIXME This does not work on page reload because the boards array is empty in the store
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
