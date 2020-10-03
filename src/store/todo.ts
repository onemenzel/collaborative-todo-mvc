import { ValueOf } from "ts-essentials";
import * as Y from "yjs";

import { objToMap, yReactive } from "@/util";
import { doc } from ".";

export interface Todo {
  done?: boolean;
  text: string;
}

export type TodoMap = Y.Map<ValueOf<Todo>>;

const todosCrdt = doc.getArray<TodoMap>("todos");
export const [todos] = yReactive(todosCrdt);

export function makeTodo(options: Todo) {
  const todo = Object.assign({ done: false }, options);
  todosCrdt.push([objToMap(todo)]);
}

export function setDone(index: number, done: boolean) {
  todosCrdt.get(index).set("done", done);
}

export function deleteTodo(index: number) {
  todosCrdt.delete(index);
}
