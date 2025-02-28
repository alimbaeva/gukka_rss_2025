import { DeepPath, KeyValueStore } from "../type/types";
import { push } from "./push";
import { slice } from "./slice";

export const deepPath: DeepPath<KeyValueStore> = (obj, paths, value, deep, result, data) => {
  if (obj !== undefined && paths.length) {
    if (1 === paths.length) {
      if (obj[paths[0]] === value) {
        push(result, data);
      }
    } else {
      deepPath(obj[paths[0]] as KeyValueStore, slice(paths, 1), value, deep-1, result, data);
    }
  }
}
