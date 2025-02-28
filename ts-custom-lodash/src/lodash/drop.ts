import { slice } from "../utils/slice";

export function drop<T>(array: T[], count = 1): T[] {
  if (count === 0) return array;
  if (count >= array.length) return [];
  return slice(array, count);
}
