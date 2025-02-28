function isCustomObject(obj) {
    return obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
  }
  
  function isCustomArray(obj) {
    return obj && typeof obj === 'object' && obj.constructor === Array;
  }
  
  function push(array, ...items) {
    const length = array.length;
  
    for (let i = 0; i < items.length; i++) {
      array[length + i] = items[i]
    }
    return array.length;
  }
  
  function slice(array, start, end = undefined) {
    const result = [];
    const length = array.length;
  
    let currentStart = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    let currentEnd = end === undefined ? length : (end < 0 ? Math.max(length + end, 0) : Math.min(end, length));
  
    for (let i = currentStart; i < currentEnd; i++) {
      push(result, array[i])
    }
    return result;
  }
  
  function chunk(array, part) {
    const result = [];
  
    if (!part) return []
  
    for (let i = 0; i < array.length; i += part) {
      push(result, slice(array, i, part + i));
    }
    return result;
  }
  
  function compact(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) push(result, array[i])
    }
    return result;
  }
  
  function drop(array, count = 1) {
    if (count === 0) return array;
    if (count >= array.length) return [];
    return slice(array, count);
  }
  
  function dropWhile(array, predicate) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i], i, array)) {
        continue;
      }
      return slice(array, i);
    }
    return [];
  }
  
  function take(array, count = 1) {
    if (count === 0) return [];
    return slice(array, 0, count);
  }
  
  function find(array, predicate) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i], i, array)) {
        return array[i];
      }
    }
    return;
  }
  
  function includes(array, value, fromIndex = 0) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  
    for (let i = startIndex; i < array.length; i++) {
      if (array[i] === value) return true
    }
    return false;
  }
  
  function map(array, predicate) {
    const result  = [];
    for (let i = 0; i < array.length; i++) {
      push(result, predicate(array[i], i, array));
    }
    return result;
  }
  
  function zip(...arrays) {
    const result  = [];
    let maxLength  = 0;
    for (let i = 0; i < arrays.length; i++) {
      maxLength = Math.max(arrays[i].length, maxLength);
    }
    for (let i = 0; i < maxLength; i++) {
      const partArr = map(arrays, (arr) => arr[i] ?? undefined);
      push(result, partArr);
    }
    return result;
  }
  
  function arrayMerge(target, source) {
    const length = Math.max(target.length, source.length);
    const result = [...target];
  
    for (let i = 0; i < length; i++) {
      const sourceValue = source[i];
      const targetValue = target[i];
  
      if (isCustomObject(sourceValue) && isCustomObject(targetValue)) {
        result[i] = objectMerge(targetValue, sourceValue);
      } else if (isCustomArray(sourceValue) && isCustomArray(targetValue)) {
        result[i] = arrayMerge(targetValue, sourceValue);
      } else {
        result[i] = sourceValue;
      }
    }
    return result;
  }
  
  function objectMerge(target, source) {
    const result = { ...target };
  
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];
  
      if (isCustomArray(sourceValue)) {
        const value = isCustomArray(targetValue) ? targetValue : [];
        result[key] = arrayMerge(value, sourceValue);
      } else if (isCustomObject(sourceValue)) {
        const value = isCustomObject(targetValue) ? targetValue : {};
        result[key] = objectMerge(value, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  
    return result;
  }
  
  function merge(target, ...sources) {
    for (const source of sources) {
      if (!isCustomObject(source) && !isCustomArray(source)) continue;
      if (isCustomObject(source)) {
        const value = target;
        objectMerge(value, source);
      } else if (isCustomArray(source)) {
        const [key, val] = source;
        if (typeof key === 'string') {
          target[key] = val;
        }
      }
    }
    return target;
  }
  
  function omit(object, [...paths]) {
    const result = {};
    for (const key in object) {
      if(!includes(paths, key)) result[key] = object[key];
    }
    return result;
  }
  
  function pick(object, [...paths]) {
    const result = {};
    for (const key of paths) {
      result[key] = object[key];
    }
    return result;
  }
  
  function omitBy(object, predicate) {
    const result = {};
    for (const key in object) {
      if(!predicate(object[key], key)) result[key] = object[key];
    }
    return result;
  }
  
  function pickBy(object, predicate) {
    const result = {};
    for (const key in object) {
      if(predicate(object[key], key)) result[key] = object[key];
    }
    return result;
  }
  
  function toPairs(object) {
    const result = [];
    for (const key in object) {
      push(result, [key, object[key]]);
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
    toPairs,
    pickBy,
    pick,
    omitBy,
    omit,
    merge,
    zip,
    map,
    includes,
    find,
    take,
    dropWhile,
    drop,
    compact,
    chunk,
    slice,
    push,
    isCustomObject,
    isCustomArray
  };
  