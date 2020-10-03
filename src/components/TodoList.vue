<template>
  <div>
    <p>
      <label for="add-todo">Add To do</label><br />
      <input name="add-todo" id="add-todo" type="text" @keyup.enter="makeTodo" />
    </p>
    <ul>
      <Todo v-for="(todo, index) in todos" :todo="todo" :index="index" :key="index" />
    </ul>
  </div>
</template>

<script lang="ts" setup="props">
export { todos } from "@/store/todo";
export { default as Todo } from "./Todo.vue";
import { makeTodo as _makeTodo } from "@/store/todo";

export function makeTodo(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement;
  _makeTodo({ text: target.value });
  target.value = "";
}
</script>

<style scoped lang="postcss">
ul {
  padding-left: 0;
}
</style>
