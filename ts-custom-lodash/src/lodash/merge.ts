import { ArrayMerge, ObjectMerge } from "../type/types";
import { isCustomArray } from "../utils/isCustomArray";
import { isCustomObject } from "../utils/isCustomObject";
import { objectMerge } from "../utils/objectMerge";

export function merge<T extends ObjectMerge | ArrayMerge>(
  target: T,
  ...sources: (ObjectMerge | ArrayMerge)[]
): T {
  for (const source of sources) {
    if (!isCustomObject(source) && !isCustomArray(source)) continue;
    if (isCustomObject(source)) {
        const value: ObjectMerge<unknown> = target as ObjectMerge<unknown>;
        objectMerge(value, source);
      } else if (isCustomArray(source)) {
        const [key, val] = source;
        if (typeof key === 'string') {
          (target as ObjectMerge)[key] = val;
        }
      }
    
  }
  return target;
}
