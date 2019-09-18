<template>
  <div class="comment">
    <h3>{{propComment.content}}</h3>
    <button class="btn btn-dark" @click="removeComment()">X</button>
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