<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <h3>{{board.description}}</h3>
    <form @submit.prevent="addList()">
      <input type="text" placeholder="title" v-model="newList.title" required />
      <button type="submit">Create List</button>
    </form>
    <div>
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
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
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
      this.newList = { title: "" };
    }
  },
  components: {
    Lists
  }
};
</script>
