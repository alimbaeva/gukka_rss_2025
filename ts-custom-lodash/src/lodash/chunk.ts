import { push } from "../utils/push";
import { slice } from "../utils/slice";

export function chunk<T>(array: T[], part: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += part) {
    push(result, slice(array, i, part + i));
  }
  return result;
}
