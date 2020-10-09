import { ValueOf } from "ts-essentials";
import { triggerRef, shallowRef, Ref, onBeforeUnmount } from "vue";
import * as Y from "yjs";

import { ObjectConstructor } from "@/types";

export function entries<T extends {}>(obj: T): Array<[string, any]> {
  return (Object as ObjectConstructor).keys(obj).map(key => [key, obj[key]]);
}

export function objToMap<T extends {}>(obj: T) {
  return new Y.Map<ValueOf<T>>(entries(obj));
}

export function execAll(...fns: Array<() => any>) {
  return () => fns.forEach(fn => fn());
}

type YjsType<T = any> = Y.Map<T> | Y.Array<T> | Y.Text | Y.XmlElement | Y.XmlFragment;

/**
 * Turns a Yjs CRDT into a reactive Vue property.
 * Reactivity is only triggered on shallow change.
 *
 * @param crdt the crdt to turn reactive
 * @returns a tuple of the computed reference for usage in
 *    Vue and a function to disable the reactivity. Only use the latter if you don't need
 *    the reference anymore.
 */
export function yReactive<T extends YjsType>(crdt: T): Ref<T> {
  const reference = shallowRef(crdt);
  const trigger = () => triggerRef(reference);
  crdt.observe(trigger);
  const unobserve = () => crdt.unobserve(trigger);
  onBeforeUnmount(unobserve);
  return reference;
}

/**
 * Turns a Yjs CRDT into a reactive Vue property.
 * Reactivity is triggered for every sub element changing.
 *
 * @param crdt the crdt to turn reactive
 * @returns a tuple of the computed reference for usage in
 *    Vue and a function to disable the reactivity. Only use the latter if you don't need
 *    the reference anymore.
 */
export function yReactiveDeep<T extends YjsType>(crdt: T): Ref<T> {
  const reference = shallowRef(crdt);
  const trigger = () => triggerRef(reference);
  crdt.observeDeep(trigger);
  const unobserve = () => crdt.unobserveDeep(trigger);
  onBeforeUnmount(unobserve);
  return reference;
}
