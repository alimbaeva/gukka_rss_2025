import { KeyValueStore } from "../type/types";
import { includes } from "./includes";

export function omit<T extends KeyValueStore>(object: T, paths: string[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key in object) {
    if(!includes(paths, key)) result[key] = object[key];
  }
  return result;
}
