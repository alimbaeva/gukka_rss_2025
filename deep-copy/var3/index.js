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


const sym = Symbol("unique");

class Parent {
  parentMethod() {
    return "I'm a parent method";
  }
}

class Child extends Parent {
  constructor (name) {
    super();
  }
}

function regularFunction(x) {
  return x * 2;
}

const arrowFunction = (x) => x * 3;
const boundFunction = regularFunction.bind(null, 5);

const baseObject = {
  num: 42,
  str: "Hello",
  bool: true,
  n: null,
  u: undefined,
  bigInt: BigInt(9007199254740991),
  sym,
  arr: [1, "text", { key: "value" }, [2, 3]],
  set: new Set([1, 2, { deep: "object" }]),
  map: new Map([
    ["key1", "value1"],
    [sym, "symbolKey"],
    [{ objKey: "yes" }, { objValue: "yes" }],
  ]),
  fn: regularFunction,
  arrowFn: arrowFunction,
  boundFn: boundFunction,
  method() {
    return "object method";
  },
};

Object.defineProperty(baseObject, "hiddenProp", {
  value: "secret",
  writable: false,
  enumerable: false,
  configurable: false,
});

const childInstance = new Child("Asel");

const extendedObject = Object.create(baseObject);
extendedObject.extra = "additional property";

const testObject = {
  baseObject,
  childInstance,
  extendedObject,
};

const copytestObject = copy(testObject);

console.log('testObject', testObject);
console.log('copytestObject', copytestObject);
console.log('copytestObject === testObject', copytestObject === testObject);
console.log('copytestObject.arr === testObject.arr', copytestObject.arr === testObject.arr);
console.log('copytestObject.map === testObject.map', copytestObject.map === testObject.map);