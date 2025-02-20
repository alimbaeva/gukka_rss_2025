function copy(obj) {
  if (typeof obj === "symbol") {
    const symbolKey = Symbol.keyFor(obj);
    return symbolKey !== undefined ? Symbol.for(symbolKey) : Symbol(obj.description);
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

  if (typeof obj === "function") {
    const funcStr = obj.toString();
    try {
      return eval(`(${funcStr})`); // ✅ Копируем функцию через eval
    } catch {
      return function (...args) {
        return obj.apply(this, args); // ✅ Фоллбэк для сложных случаев
      };
    }
  }

  if(Array.isArray(obj)) return obj.map((item) => copy(item));

  if (obj == null || typeof obj !== 'object') return obj;

  const proto = Object.getPrototypeOf(obj);
  const newInstance = Object.create(proto);

  // 🟢 Копируем все свойства (включая из родительских классов)
  let currentObj = obj;
  while (currentObj !== null) {
    Object.getOwnPropertyNames(currentObj).forEach((key) => {
      if (!newInstance.hasOwnProperty(key)) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObj, key);
        if (descriptor && "value" in descriptor) {
          descriptor.value = copy(descriptor.value);
        }
        Object.defineProperty(newInstance, key, descriptor);
      }
    });
    currentObj = Object.getPrototypeOf(currentObj);
  }

  return newInstance;
}
