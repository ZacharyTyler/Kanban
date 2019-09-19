<template>
  <div class="comment">
    <div class="row mt-2 mb-2">
      <div class="col-9 float-left">
        <h6>{{propComment.content}}</h6>
      </div>
      <div class="col-3 d-flex align-self-center">
        <div class="col">
          <button
            class="btn btn-sm btn-outline-light btn-dark float-right d-flex mb-2"
            @click="removeComment()"
          >X</button>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["propComment"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    removeComment() {
      this.$store.dispatch("removeComment", this.propComment);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>