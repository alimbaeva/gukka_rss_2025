import { Predicate } from "../type/types";
import { push } from "../utils/push";

export function map<T>(array: T[], predicate: Predicate<T>): T[] {
  const result: T[]  = [];
  for (let i = 0; i < array.length; i++) {
    push(result, predicate(array[i], i, array));
  }
  return result;
}
