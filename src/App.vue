<template>
  <TodoList />
</template>

<script lang="ts" setup="props">
export { default as TodoList } from "@/components/TodoList.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.button {
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  border: 1px solid black;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
}

.button-group .button {
  margin-left: 0;
  border-radius: 0;
  border-left: none;
}

.button-group .button:first-child {
  border-left: 1px solid black;
  border-top-left-radius: 0.125rem;
  border-bottom-left-radius: 0.125rem;
}

.button-group .button:last-child {
  border-top-right-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;
}

.button-group {
  display: inline-block;
  margin-left: 1rem;
}
</style>
