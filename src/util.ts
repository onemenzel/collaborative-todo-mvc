import { ValueOf } from "ts-essentials";
import { triggerRef, shallowRef, Ref, onBeforeUnmount } from "vue";
import * as Y from "yjs";

import { YObject } from "@/types";

export function objToMap<T extends {}>(obj: T) {
  return new Y.Map<ValueOf<T>>(Object.entries(obj));
}

export function execAll(...fns: Array<() => any>) {
  return () => fns.forEach(fn => fn());
}

// #region crypto
/**
 * i.e. 0-255 -> '00'-'ff'
 * from https://stackoverflow.com/a/27747377
 * @param dec decimal number to convert to hex string
 */
//
function dec2hex(dec: number) {
  return dec < 10 ? "0" + String(dec) : dec.toString(16);
}

/**
 * Generate a securely random string
 * from https://stackoverflow.com/a/27747377
 * @param len length to the string
 */
export function generateRandomString(len?: number) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
// #endregion crypto

// #region yjs utils
type YjsType<T = any> =
  | YObject<T>
  | Y.Map<ValueOf<T>>
  | Y.Array<ValueOf<T>>
  | Y.Text
  | Y.XmlElement
  | Y.XmlFragment;

export function createYObject<T extends object>(o: T) {
  return (new Y.Map(Object.entries(o)) as unknown) as YObject<T>;
}

/**
 * Turns a Yjs CRDT into a reactive Vue property.
 * Reactivity is only triggered on shallow change.
 *
 * @param crdt the crdt to turn reactive
 * @returns a reference for usage in Vue.
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
 * @returns a reference for usage in Vue.
 */
export function yReactiveDeep<T extends YjsType>(crdt: T): Ref<T> {
  const reference = shallowRef(crdt);
  const trigger = () => triggerRef(reference);
  crdt.observeDeep(trigger);
  const unobserve = () => crdt.unobserveDeep(trigger);
  onBeforeUnmount(unobserve);
  return reference;
}
// #endregion yjs utils
