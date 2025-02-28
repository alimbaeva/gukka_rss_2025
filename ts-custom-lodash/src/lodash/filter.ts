import { Filterable, PredicateFilter } from "../type/types";
import { deepPath } from "../utils/deepPath";
import { isCustomArray } from "../utils/isCustomArray";
import { isCustomObject } from "../utils/isCustomObject";
import { push } from "../utils/push";
import { slice } from "../utils/slice";

export function filter<T extends Filterable<T>>(collection: T[], predicate: PredicateFilter<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (typeof predicate === "function") {
      if(predicate(collection[i], i, collection)) push(result, collection[i]);
    }
    if (isCustomObject(predicate)) {
      let isMatch = false
      for (const key in predicate) {
        predicate[key] === collection[i][key] ? isMatch = true : isMatch = false;
      }
      if (isMatch) push(result, collection[i]);
    }
    if (isCustomArray(predicate)) {
      const value = predicate[predicate.length - 1];
      const paths = slice(predicate , 0, predicate.length - 1);
      deepPath(collection[i], paths as string[], value, paths.length, result, collection[i]);
    }
    if (typeof predicate === "string") {
      if (collection[i][predicate]) push(result, collection[i]);
    }
  }
  return result;
}
