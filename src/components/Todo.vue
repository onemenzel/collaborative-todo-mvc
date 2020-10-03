<template>
  <li>
    <input
      type="checkbox"
      :name="'check-' + index"
      :id="'check-' + index"
      :checked="todoRef.get('done')"
      @change="setDone($event, index)"
    />
    <span>{{ todoRef.get("text") }}</span>
    <button class="delete-button" @click="deleteTodo(index)">Löschen</button>
  </li>
</template>

<script lang="ts" setup="props">
export { deleteTodo } from "@/store/todo";
import { setDone as _setDone, TodoMap } from "@/store/todo";
import { yReactive } from "@/util";
import { onBeforeUnmount } from "vue";

declare const props: {
  todo: TodoMap;
  index: number;
};

const [todoRef, unmountTodo] = yReactive(props.todo);
onBeforeUnmount(unmountTodo);
export { todoRef };

export function setDone(e: Event, index: number) {
  const target = e.target as HTMLInputElement;
  _setDone(index, target.checked);
}
</script>

<style scoped lang="postcss">
li {
  list-style-type: none;
  padding-bottom: 0.5rem;
}
input[type="checkbox"] {
  display: inline-block;
  margin-right: 1rem;
}
.delete-button {
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  border: 1px solid black;
  background: transparent;
}
</style>
