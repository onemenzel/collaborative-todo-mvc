type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

/** By using this ObjectConstructor, we get a better experience when iterating over Object.keys */
export interface ObjectConstructor
  extends Omit<globalThis.ObjectConstructor, "keys"> {
  keys<T>(o: T): ObjectKeys<T>;
}
