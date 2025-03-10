function copy(obj) {
  if (typeof obj === "symbol") {
    const symbolKey = Symbol.keyFor(obj);
    return symbolKey !== undefined ? Symbol.for(symbolKey) : Symbol(obj.description);
  }

  if (obj instanceof Date) {
    const copyDate = new Date(obj.getTime());
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    Object.defineProperties(copyDate, descriptors);
    return copyDate;
  }

  if (obj instanceof Set) {
    const copySet = new Set;
    obj.forEach((val) => copySet.add(copy(val)));
    return copySet;
  }

  if (obj instanceof Map) {
    const copyMap = new Map;
    obj.forEach((val, key) => copyMap.set(copy(key), copy(val)));
    return copyMap;
  }

  if (typeof obj === 'function') {
    try {
      if (!obj.hasOwnProperty('prototype')) return obj;
      const copyFunc = function () {
        return obj.apply(this, arguments);
      };
      Object.setPrototypeOf(copyFunc, Object.getPrototypeOf(obj));
      Object.defineProperties(copyFunc, Object.getOwnPropertyDescriptors(obj));
      return copyFunc;
    } catch {
      return obj;
    }
  }

  if(Array.isArray(obj)) return obj.map(copy);

  if (obj == null || typeof obj !== 'object') return obj;

  const proto = Object.getPrototypeOf(obj);

  const copyObject = Object.create(proto);

  const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor) {
      let { value, set, get } = descriptor;
    
      if (value !== undefined) {
        descriptor.value = typeof value === 'function' ? value.bind(copyObject) : copy(value);
      } else {
        if (get) descriptor.get = get.bind(copyObject);
        if (set) descriptor.set = set.bind(copyObject);
      }
    }
  
    Object.defineProperty(copyObject, key, descriptor);
  }  

  let protoObj = proto;
  while (protoObj !== null) {
    const methods = Object.getOwnPropertyNames(protoObj).concat(Object.getOwnPropertySymbols(protoObj));
    for (let i = 0; i < methods.length; i++) {
      const method = methods[i];
      if (!Object.prototype.hasOwnProperty.call(copyObject, method)) {
        const descriptor = Object.getOwnPropertyDescriptor(protoObj, method);
        if (descriptor && "value" in descriptor && typeof descriptor.value === 'function') {
          const newMethod = descriptor.value.bind(copyObject);
          Object.defineProperty(copyObject, method, {
            value: newMethod,
            writable: true,
            configurable: true,
            enumerable: true
          });
        }
      }
    }
    protoObj = Object.getPrototypeOf(protoObj);
  }

  return copyObject;
}
