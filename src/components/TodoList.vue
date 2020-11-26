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

<script lang="ts">
import { defineComponent } from "vue";
import { yReactive } from "@/util";
import { todos as _todos, makeTodo as _makeTodo } from "@/store/todo";
import Todo from "./Todo.vue";

export default defineComponent({
  name: "TodoList",
  components: { Todo },
  props: {},
  setup() {
    const todos = yReactive(_todos);

    function makeTodo(e: KeyboardEvent) {
      const target = e.target as HTMLInputElement;
      _makeTodo({ text: target.value });
      target.value = "";
    }

    return { todos, makeTodo };
  },
});
</script>

<style scoped lang="postcss">
ul {
  padding-left: 0;
}

.todos {
  flex-grow: 1;
}
</style>
