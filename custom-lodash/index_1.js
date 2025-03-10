// array methods
function join(array, separator = '') {
  let result = '';
  for (let i = 0; i < array.length; i += 1) {
    if (i === 0) {
      result = `${result}${array[i]}`;
    } else {
      result = `${result}${separator}${array[i]}`;
    }
  }
  return result;
}

function split(string, separator = '') {
  let result = [];
  let part = '';
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === separator) {
      push(result, part);
      result = `${result}${string[i]}`;
    } else {
      part = `${part}${string[i]}`;
    }
  }
  return result;
}

function isCustomObject(obj) {
  return obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
}

function isCustomArray(obj) {
  return obj && typeof obj === 'object' && obj.constructor === Array;
}

function pushCustom(array, ...items) {
  const length = array.length;

  for (let i = 0; i < items.length; i++) {
    array[length + i] = items[i]
  }
  return array.length;
}

function sliceCustom(array, start, end = undefined) {
  const result = [];
  const length = array.length;

  let currentStart = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  let currentEnd = end === undefined ? length : (end < 0 ? Math.max(length + end, 0) : Math.min(end, length));

  for (let i = currentStart; i < currentEnd; i++) {
    pushCustom(result, array[i])
  }
  return result;
}

// lodash methods

function chunkCustom(array, part) {
  const result = [];

  for (let i = 0; i < array.length; i += part) {
    pushCustom(result, sliceCustom(array, i, part + i));
  }
  return result;
}

function compactCustom(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i]) pushCustom(result, array[i])
  }
  return result;
}

function dropCustom(array, count = 1) {
  if (count === 0) return array;
  if (count >= array.length) return [];
  return sliceCustom(array, count);
}

function dropWhileCustom(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      continue;
    }
    return sliceCustom(array, i);
  }
}

function takeCustom(array, count = 1) {
  if (count === 0) return [];
  return sliceCustom(array, 0, count);
}

function findCustom(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return;
}

function includesCustom(array, value, fromIndex = 0) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  for (let i = startIndex; i < array.length; i++) {
    if (array[i] === value) return true
  }
  return false;
}

function mapCustom(array, predicate) {
  const result  = [];
  for (let i = 0; i < array.length; i++) {
    pushCustom(result, predicate(array[i], i, array));
  }
  return result;
}

function zipCustom(...arrays) {
  const result  = [];
  let maxLength  = 0;
  for (let i = 0; i < arrays.length; i++) {
    maxLength = Math.max(arrays[i].length, maxLength);
  }
  for (let i = 0; i < maxLength; i++) {
    const partArr = mapCustom(arrays, (arr) => arr[i] ?? undefined);
    pushCustom(result, partArr);
  }
  return result;
}

function arrayMerge(object, key, objectValue, sourceValue) {
  if (!isCustomArray(objectValue)) {
    object[key] = [];
  }

  for (let i = 0; i < sourceValue.length; i++) {
    if (isCustomObject(sourceValue[i])) {
      object[key][i] = mergeCustom(object[key][i] || {}, sourceValue[i]);
    } else {
      object[key][i] = sourceValue[i];
    }
  }
}

function objectMerge(object, key, objectValue, sourceValue) {
  if (!isCustomObject(objectValue)) {
    object[key] = {};
  }

  mergeCustom(object[key], sourceValue);
}

function mergeCustom(object, ...sources) {
  for (const source of sources) {
    if (!isCustomObject(source) && !isCustomArray(source)) continue;
    
    for (const key in source) {
      const sourceValue = source[key];
      const objectValue = object[key];

      if (isCustomArray(sourceValue)) {
        arrayMerge(object, key, objectValue, sourceValue);
      } else if (isCustomObject(sourceValue)) {
        objectMerge(object, key, objectValue, sourceValue);
      } else {
        object[key] = sourceValue;
      }
    }
  }
  return object;
}

function omitCustom(object, [...paths]) {
  const result = {};
  for (const key in object) {
    if(!includesCustom(paths, key)) result[key] = object[key];
  }
  return result;
}

function pickCustom(object, [...paths]) {
  const result = {};
  for (const key of paths) {
    result[key] = object[key];
  }
  return result;
}

function omitByCustom(object, predicate) {
  const result = {};
  for (const key in object) {
    if(!predicate(object[key], key)) result[key] = object[key];
  }
  return result;
}

function pickByCustom(object, predicate) {
  const result = {};
  for (const key in object) {
    if(predicate(object[key], key)) result[key] = object[key];
  }
  return result;
}

function toPairsCustom(object) {
  const result = [];
  for (const key in object) {
    pushCustom(result, [key, object[key]]);
  }
  return result;
}

const deepPath = (obj, paths, value, deep, result, data) => {
  if (obj !== undefined && paths.length) {
    if (1 === paths.length) {
      if (obj[paths[0]] === value) {
        push(result, data);
      }
    } else {
      deepPath(obj[paths[0]], slice(paths, 1), value, deep-1, result, data);
    }
  }
}

function filter(collection, predicate) {
  const result = [];
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
      deepPath(collection[i], paths, value, paths.length, result, collection[i]);
    }
    if (typeof predicate === "string") {
      if (collection[i][predicate]) push(result, collection[i]);
    }
  }
  return result;
}

module.exports = {
  filter,
  toPairsCustom,
  pickByCustom,
  pickCustom,
  omitByCustom,
  omitCustom,
  mergeCustom,
  zipCustom,
  mapCustom,
  includesCustom,
  findCustom,
  takeCustom,
  dropWhileCustom,
  dropCustom,
  compactCustom,
  chunkCustom,
  sliceCustom,
  pushCustom,
  isCustomObject,
  isCustomArray
};
