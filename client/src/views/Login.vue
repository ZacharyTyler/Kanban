<template>
  <div class="login">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div
      class="container-fluid pb-5 pt-5 mb-5 align-items-center card bg-dark text-white kanban-board"
    >
      <h1 class="page-title">Kanban Board</h1>
      <h2 class="page-title pb-5">
        <i>By: Zach</i>
      </h2>
      <div class="row d-flex justify-content-center">
        <div class="col-3 opacity">
          <img class="naruto" src="../Naruots/sasuke.png" alt="Susuke" />
        </div>
        <div class="col-6 mt-4">
          <br />
          <br />
          <form v-if="loginForm" @submit.prevent="loginUser">
            <input class="text-center" type="email" v-model="creds.email" placeholder="email" />
            <input
              class="text-center"
              type="password"
              v-model="creds.password"
              placeholder="password"
            />
            <button class="btn btn-dark btn-outline-light" type="submit">Login</button>
          </form>
          <form v-else @submit.prevent="register">
            <input type="text" v-model="newUser.name" placeholder="name" />
            <input type="email" v-model="newUser.email" placeholder="email" />
            <input type="password" v-model="newUser.password" placeholder="password" />
            <button class="btn btn-outline-light mt-2" type="submit">Create Account</button>
          </form>
        </div>
        <div class="col-3 opacity">
          <img class="naruto" src="../Naruots/naruto.png" alt="naruto" />
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="action" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? Click here to Register</p>
          <p v-else>Already have an account? Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.action {
  cursor: pointer;
}
.naruto {
  max-height: 40%;
}
</style>