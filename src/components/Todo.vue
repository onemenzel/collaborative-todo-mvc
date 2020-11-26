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

<script lang="ts">
import { PropType, ref, defineComponent } from "vue";
import { YObject } from "@/types";
import { yReactive } from "@/util";
import { changeTodoText, setDone as _setDone, Todo, deleteTodo } from "@/store/todo";

export default defineComponent({
  name: "Todo",
  components: {},
  props: {
    todo: { type: Object as PropType<YObject<Todo>>, required: true },
    index: { type: Number, required: true },
  },
  setup(props) {
    const todoRef = yReactive(props.todo);

    const editing = ref(false);
    const todoTxt = ref(props.todo.get("text"));

    function setDone(e: Event, index: number) {
      const target = e.target as HTMLInputElement;
      _setDone(index, target.checked);
    }

    function toggleEdit() {
      if (editing.value === true && props.todo.get("text") !== todoTxt.value) {
        changeTodoText(props.index, todoTxt.value);
      }
      editing.value = !editing.value;
    }

    return { todoRef, editing, todoTxt, setDone, toggleEdit, deleteTodo };
  },
});
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
