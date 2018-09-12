<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter="addTodo"
    >
    <Item :todo="todo"></Item>
  </section>
</template>

<script>
import Item from "./item.vue";
export default {
  components: { Item },
  data() {
    return {
      todo: {
        id: 0,
        content: "somthing todo",
        completed: true
      }
    };
  },
  methods: {
    addTodo() {}
  }
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: none;
  outline: none;
  color: inherit;
  border: 1px solid #999;
  box-shadow: inset 0 -2px 1px 0 rbga(0, 0, 0, 0.5);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
}
</style>

