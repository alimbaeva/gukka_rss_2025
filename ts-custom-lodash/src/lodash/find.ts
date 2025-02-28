import { Predicate } from "../type/types";

export function find<T>(array: T[], predicate: Predicate<T>): T | undefined {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return;
}
