import { ArrayMerge, ObjectMerge } from "../type/types";
import { arrayMerge } from "./arrayMerge";
import { isCustomArray } from "./isCustomArray";
import { isCustomObject } from "./isCustomObject";

export function objectMerge<T extends ObjectMerge, U extends ObjectMerge>(
  target: T,
  source: U
): T & U {
  const result: ObjectMerge = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (isCustomArray(sourceValue)) {
      const value = isCustomArray(targetValue) ? (targetValue as ArrayMerge) : [];
      result[key] = arrayMerge(value, sourceValue) as unknown;
    } else if (isCustomObject(sourceValue)) {
      const value: ObjectMerge = isCustomObject(targetValue) ? targetValue : {};
      result[key] = objectMerge(value, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result as T & U;
}
