<template>
  <li>
    <input
      type="checkbox"
      :name="'check-' + index"
      :id="'check-' + index"
      :checked="todoRef.get('done')"
      @change="setDone($event, index)"
    />
    <input v-if="editing" type="text" v-model="todoTxt" @keyup.enter="toggleEdit" />
    <span v-else>{{ todoRef.get("text") }}</span>
    <div class="button-group">
      <button class="button" @click="toggleEdit">🖋</button>
      <button class="button" @click="deleteTodo(index)">🗑</button>
    </div>
  </li>
</template>

<script lang="ts" setup="props">
export { deleteTodo } from "@/store/todo";
import { changeTodoText, setDone as _setDone, TodoMap } from "@/store/todo";
import { yReactive } from "@/util";
import { ref } from "vue";

declare const props: {
  todo: TodoMap;
  index: number;
};

export const todoRef = yReactive(props.todo);

export const editing = ref(false);
export const todoTxt = ref(props.todo.get("text") as string);

export function setDone(e: Event, index: number) {
  const target = e.target as HTMLInputElement;
  _setDone(index, target.checked);
}

export function toggleEdit() {
  if (editing.value === true && props.todo.get("text") !== todoTxt.value) {
    changeTodoText(props.index, todoTxt.value);
  }
  editing.value = !editing.value;
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
</style>
