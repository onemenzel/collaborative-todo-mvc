import { ValueOf } from "ts-essentials";
import * as Y from "yjs";

import { objToMap } from "@/util";
import { doc } from ".";

export interface Todo {
  done?: boolean;
  text: string;
}

export type TodoMap = Y.Map<ValueOf<Todo>>;

export const todos = doc.getArray<TodoMap>("todos");

export function makeTodo(options: Todo) {
  const todo = Object.assign({ done: false }, options);
  todos.push([objToMap(todo)]);
}

export function setDone(index: number, done: boolean) {
  todos.get(index).set("done", done);
}

export function changeTodoText(index: number, text: string) {
  todos.get(index).set("text", text);
}

export function deleteTodo(index: number) {
  todos.delete(index);
}
