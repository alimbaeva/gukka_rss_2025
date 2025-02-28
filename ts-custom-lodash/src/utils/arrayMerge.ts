import { ArrayMerge } from "../type/types";
import { isCustomArray } from "./isCustomArray";
import { isCustomObject } from "./isCustomObject";
import { objectMerge } from "./objectMerge";

export function arrayMerge<T>(target: ArrayMerge<T>, source: ArrayMerge<T>): ArrayMerge<T> {
  const length = Math.max(target.length, source.length);
  const result: ArrayMerge<T> = [...target];

  for (let i = 0; i < length; i++) {
    const sourceValue = source[i];
    const targetValue = target[i];

    if (isCustomObject(sourceValue) && isCustomObject(targetValue)) {
      result[i] = objectMerge(targetValue, sourceValue) as T;
    } else if (isCustomArray(sourceValue) && isCustomArray(targetValue)) {
      result[i] = arrayMerge(targetValue, sourceValue) as T;
    } else {
      result[i] = sourceValue;
    }
  }
  return result;
}
