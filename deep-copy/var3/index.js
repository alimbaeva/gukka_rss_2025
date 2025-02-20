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

  if (typeof obj === 'function') {
    try {
      const newFunc = function (...args) {
        return obj.call(this, ...args);
      };
      Object.setPrototypeOf(newFunc, Object.getPrototypeOf(obj));
      Object.defineProperties(newFunc, Object.getOwnPropertyDescriptors(obj));
      return newFunc;
    } catch {
      return obj; // Если ошибка — вернуть оригинал
    }
  }
  
  

  if(Array.isArray(obj)) return obj.map((item) => copy(item));

  if (obj == null || typeof obj !== 'object') return obj;

  const proto = Object.getPrototypeOf(obj);
  if (proto !== Object.prototype && proto !== null) {
    const newInstance = Object.create(proto);
    for (const key of Object.getOwnPropertyNames(obj)) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);
      if (descriptor && "value" in descriptor) {
        descriptor.value = copy(obj[key]);
      }
      Object.defineProperty(newInstance, key, descriptor);
    }
    return newInstance;
  }

  const copyObject = Object.create(proto);
  for (const key of Object.getOwnPropertyNames(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor && "value" in descriptor) {
      descriptor.value = copy(obj[key]);
    }
    Object.defineProperty(copyObject, key, descriptor);
  }

  return copyObject;
}

console.log('var-3')


const complexObject = {
  number: 42,
  string: "Hello, world!",
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  symbol: Symbol("unique"),
  bigInt: BigInt(123456789012345678901234567890),
  array: [1, "text", { key: "value" }, [2, 3]],
  set: new Set([1, 2, 3, { nested: "object" }]),
  map: new Map([
    ["key1", "value1"],
    [{ objKey: true }, "value2"],
  ]),
  nestedObject: {
    level1: {
      level2: {
        level3: "deep",
      },
    },
  },
  func: function (x) {
    return x * 2;
  },
  arrowFunc: (x) => x + 1,
  method() {
    return "I am a method";
  },
  classInstance: new (class Example {
    constructor(name) {
      this.name = name;
    }
    greet() {
      return `Hello, ${this.name}`;
    }
  })("Asel"),
};

Object.defineProperty(complexObject, "nonEnumerable", {
  value: "Hidden",
  enumerable: false,
});

const copyFn = copy(complexObject)

console.log(complexObject.nestedObject.level1 === copyFn.nestedObject.level1)
console.log(complexObject.nestedObject.level1.level2.level3 === copyFn.nestedObject.level1.level2.level3)
console.log(copyFn.nestedObject)