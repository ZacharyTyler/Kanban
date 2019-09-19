<template>
  <div class="boards container rounded opacity">
    <hr />
    <div class="row">
      <div class="col">
        <button class="btn btn-dark float-right mb-3 cuz-rounded" @click="logout()">Logout</button>
      </div>
    </div>
    <h1 class="pb-5 card-header">
      <b>Kanban Boards:</b>
    </h1>
    <!-- <div class="card text-white bg-dark mb-3 mt-3 p-3">
      <form class="p-3" @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required />
        <input type="text" placeholder="description" v-model="newBoard.description" />
        <button type="submit">Create Board</button>
      </form>
    </div>
    TODO new Make Board-->
    <div class="row">
      <div class="kanban-board text-white bg-dark mb-3 mt-3 p-3 pb-5 col">
        <h3 class="card-header">Make a Board</h3>
        <hr />
        <div class="input-group justify-content-center">
          <form @submit.prevent="addBoard">
            <input
              type="text"
              class="form-control rounded mr-2"
              placeholder="Title"
              v-model="newBoard.title"
              required
            />
            <hr />
            <input
              type="text"
              class="form-control rounded"
              placeholder="Description"
              v-model="newBoard.description"
            />
            <div class="center-block mt-3" id="button-addon4">
              <button class="btn btn-outline-light mt-2" type="submit">Create Board</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Boards -->
    <div class="row justify-content-center">
      <div class="col-10 justify-content-center d-flex">
        <div class="kanban-board card text-white bg-dark mb-3 mt-3 p-3 pb-5 w-50">
          <div class="card-header">Already Made Board:</div>
          <div class="card-body">
            <ul>
              <dt class="text-white pb-2" v-for="board in boards" :key="board._id">
                <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
                <i class="fas fa-minus-circle ml-5 white float-right" @click="removeBoard(board)"></i>
              </dt>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    logout() {
      this.$store.dispatch("logout");
    },
    removeBoard(board) {
      this.$store.dispatch("removeBoard", board._id);
    }
  }
};
</script>
<style>
a {
  color: white;
}

a:visited {
  color: white;
}
a:hover {
  color: white;
}
.pos-right {
  position: relative;
  left: 5%;
}
.opacity {
  opacity: 1;
  /* filter: alpha(opacity=50); */
}
.white {
  color: white;
}
.kanban-board {
  border-width: thick !important;
  border-radius: 15px;
  box-shadow: -15px -15px 20px 12px rgb(31, 31, 31);
}
.cuz-rounded {
  border-radius: 10px;
}
</style>