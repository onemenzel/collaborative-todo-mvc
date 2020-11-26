import { createYObject } from "@/util";
import { doc } from ".";
import { YObject } from "@/types";

export interface Todo {
  done?: boolean;
  text: string;
}

export const todos = doc.getArray<YObject<Todo>>("todos");

export function makeTodo(options: Todo) {
  const todo: Todo = Object.assign({ done: false }, options);
  todos.push([createYObject(todo)]);
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
