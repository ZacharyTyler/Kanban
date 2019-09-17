<template>
  <div class="task">
    <h3>{{propTask.description}}</h3>
  </div>
</template>


<script>
export default {
  name: "task",
  props: ["propTask"],
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