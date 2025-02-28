import { slice } from "../utils/slice";

export function take<T>(array: T[], count = 1): T[] {
  if (count === 0) return [];
  return slice(array, 0, count);
}
