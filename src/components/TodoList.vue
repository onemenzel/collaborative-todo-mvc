<template>
  <div class="todos">
    <p>
      <label for="add-todo">Add To do</label><br />
      <input name="add-todo" id="add-todo" type="text" @keyup.enter="makeTodo" />
    </p>
    <ul>
      <Todo v-for="(todo, index) in todos" :todo="todo" :index="index" :key="todo" />
    </ul>
  </div>
</template>

<script lang="ts" setup="props">
import { yReactive } from "@/util";
import { todos as _todos, makeTodo as _makeTodo } from "@/store/todo";
export { default as Todo } from "./Todo.vue";

export const todos = yReactive(_todos);

export function makeTodo(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement;
  _makeTodo({ text: target.value });
  target.value = "";
}

// FIXME: vetur fix. this should not be necessary.
export default {};
</script>

<style scoped lang="postcss">
ul {
  padding-left: 0;
}

.todos {
  flex-grow: 1;
}
</style>
