import { KeyValueStore } from "../type/types";

export function pick<T extends KeyValueStore>(object: T, [...paths]: string[]): KeyValueStore {
  const result: KeyValueStore = {};
  for (const key of paths) {
    result[key] = object[key] as Partial<T>;
  }
  return result;
}
