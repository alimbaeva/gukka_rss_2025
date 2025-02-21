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
      if (!obj.hasOwnProperty('prototype')) return obj;
      const copyFunc = function () {
        return obj.apply(this, arguments);
      };
      Object.setPrototypeOf (copyFunc, Object.getPrototypeOf(obj));
      Object.defineProperties (copyFunc, Object.getOwnPropertyDescriptors(obj));
      return copyFunc;
    } catch {
      return obj;
    }
  }

  if(Array.isArray(obj)) return obj.map((item) => copy(item));

  if (obj == null || typeof obj !== 'object') return obj;

  const proto = Object.getPrototypeOf(obj);

  const copyObject = Object.create(proto);

  const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    
    if (descriptor && "value" in descriptor) {
      if (typeof descriptor.value === 'function') {
        descriptor.value = descriptor.value.bind(copyObject);
      } else {
        descriptor.value = copy(descriptor.value);
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



// ====================================================================

const sym = Symbol("unique");

class Parent {
  parentMethod() {
    return "I'm a parent method";
  }
}

class Child extends Parent {
  constructor (name) {
    super();
    this.name = name;
  }

  get getFn() {
    return this.name
  }

  set seting(name) {
    this.name = name;
    return this.name
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

// console.log('testObject', testObject);
// console.log('testObject.extendedObject', testObject.extendedObject);
// console.log('copytestObject.extendedObject', copytestObject.extendedObject);
// console.log('copytestObject.extendedObject === testObject.extendedObject', copytestObject.extendedObject === testObject.extendedObject);
console.log('testObject.childInstance', testObject.childInstance.getFn());
console.log('copytestObject.childInstance', copytestObject.childInstance.getFn());
console.log('copytestObject.childInstance === testObject.childInstance', copytestObject.childInstance.getFn === testObject.childInstance.getFn);
// console.log('testObject.childInstance.parentMethod', testObject.childInstance.parentMethod());
// console.log('copytestObject.childInstance.parentMethod', copytestObject.childInstance.parentMethod());
// console.log('copytestObject.childInstance.parentMethod', copytestObject.childInstance.parentMethod  ===  testObject.childInstance.parentMethod);
// console.log('testObject.baseObject.fn(2)', testObject.baseObject.fn(2));
// console.log('copytestObject.baseObject.fn(2)', copytestObject.baseObject.fn(2));
// console.log('copytestObject.baseObject.fn === testObject.baseObject.fn', copytestObject.baseObject.fn === testObject.baseObject.fn);
// console.log('testObject.baseObject.arrowFn(6)', testObject.baseObject.arrowFn(6));
// console.log('copytestObject.baseObject.arrowFn(6)', copytestObject.baseObject.arrowFn(6));
// console.log('copytestObject.baseObject.arrowFn === testObject.baseObject.arrowFn', copytestObject.baseObject.arrowFn === testObject.baseObject.arrowFn);
// console.log('testObject.baseObject.boundFunction()', testObject.baseObject.boundFn());
// console.log('copytestObject.baseObject.boundFunction()', copytestObject.baseObject.boundFn());
// console.log('copytestObject.baseObject.boundFn === testObject.baseObject.boundFn', copytestObject.baseObject.boundFn === testObject.baseObject.boundFn);
// console.log('testObject.baseObject.method()', testObject.baseObject.method());
// console.log('copytestObject.baseObject.method()', copytestObject.baseObject.method());
// console.log('copytestObject.baseObject.method === testObject.baseObject.method', copytestObject.baseObject.method === testObject.baseObject.method);
// console.log('copytestObject', copytestObject.baseObject.set);
// console.log('copytestObject', copytestObject.baseObject.map);
// console.log('copytestObject.baseObject.set === testObject.baseObject.set', copytestObject.baseObject.set === testObject.baseObject.set);
// console.log('copytestObject.baseObject.map === testObject.baseObject.map', copytestObject.baseObject.map === testObject.baseObject.map);
// console.log('copytestObject.baseObject.arr === testObject.baseObject.arr', copytestObject.baseObject.arr === testObject.baseObject.arr);
// console.log('copytestObject.baseObject.arr[2] === testObject.baseObject.arr[2]', copytestObject.baseObject.arr[2] === testObject.baseObject.arr[2]);
// console.log('copytestObject.baseObject.map === testObject.baseObject.map', copytestObject.baseObject.map === testObject.baseObject.map);