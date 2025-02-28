import { Predicate } from "../type/types";
import { slice } from "../utils/slice";

export function dropWhile<T>(array: T[], predicate: Predicate<T>): T[] {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      continue;
    }
    return slice(array, i);
  }
  return []
}
