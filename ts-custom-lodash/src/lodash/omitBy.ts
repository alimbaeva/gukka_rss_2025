import { KeyValueStore, PredicateObj } from "../type/types";

export function omitBy<T extends KeyValueStore>(object: T, predicate: PredicateObj<T>): Partial<T> {
  const result: Partial<T> = {};
  for (const key in object) {
    if(!predicate(object[key], key)) result[key] = object[key];
  }
  return result;
}
