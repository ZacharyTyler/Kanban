<template>
  <div class="comment">
    <h3>{{propcomment.content}}</h3>
    <button class="btn btn-dark" @click="removeComment()">Delete Comment</button>
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
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>