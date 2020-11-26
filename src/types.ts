import { ValueOf } from "ts-essentials";
import { Map as YMap } from "yjs";

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

export type Entry<T> = T extends ArrayLike<infer U>
  ? [string, U]
  : { [K in keyof T]: [K, T[K]] }[keyof T];

/**
 * By using this ObjectConstructor, we get a better dev experience
 * when iterating over Object.keys or Object.entries
 */
export interface ObjectConstructor extends Omit<globalThis.ObjectConstructor, "keys" | "entries"> {
  keys<T>(o: T): ObjectKeys<T>;
  entries<T>(o: T): Entry<T>[];
}

type mapMethods = "observe" | "observeDeep" | "unobserve" | "unobserveDeep";
/**
 * This is an alternative interface for Yjs Maps. It provides Object-Like accessor funcs to the Map.
 * Use it like this: `let map = new Y.Map(Object.entries(obj)) as unknown as YObject<typeof obj>`
 * or together with `util.createYObject()` for a less complicated access.
 */
export interface YObject<T> extends Iterable<Entry<T>>, Pick<YMap<ValueOf<T>>, mapMethods> {
  [Symbol.iterator](): IterableIterator<Entry<T>>;
  clone(): YObject<T>;
  delete(key: keyof T): void;
  entries(): IterableIterator<Entry<T>>;
  forEach<K extends keyof T>(f: (item: T[K], key: K, thisArg: YObject<T>) => void): void;
  get<K extends keyof T>(key: K): T[K];
  has(key: keyof T): boolean;
  keys(): Array<keyof T>;
  set<K extends keyof T>(key: K, value: T[K]): typeof value;
  toJSON(): T;
  values(): Array<ValueOf<T>>;
}
