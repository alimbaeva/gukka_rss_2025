import { push } from "../utils/push";
import { map } from "./map";

export function zip<T extends unknown[][]>(...arrays: T): { [K in keyof T]: T[K][number] | undefined }[] {
  const result: T[][]  = [];
  let maxLength  = 0;
  for (let i = 0; i < arrays.length; i++) {
    maxLength = Math.max(arrays[i].length, maxLength);
  }
  for (let i = 0; i < maxLength; i++) {
      const partArr = map(arrays, (arr) => typeof arr[i] === 'undefined' ? undefined : arr[i]);
    push(result, partArr);
  }
  return result as { [K in keyof T]: T[K][number] | undefined }[];
}
