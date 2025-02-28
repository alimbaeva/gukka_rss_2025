import { KeyValuePairArray, KeyValueStore } from "../type/types";
import { push } from "../utils/push";

export function toPairs<T extends KeyValueStore>(object: T): KeyValuePairArray<T> {
  const result: KeyValuePairArray<T> = [];
  for (const key in object) {
    push(result, [key, object[key]]);
  }
  return result;
}
