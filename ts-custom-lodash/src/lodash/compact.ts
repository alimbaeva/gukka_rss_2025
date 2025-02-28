import { push } from "../utils/push";

export function compact<T>(array: T[]): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i]) push(result, array[i])
  }
  return result;
}
