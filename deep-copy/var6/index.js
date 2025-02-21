function copy(obj) {
  if (typeof obj === "symbol") {
    const symbolKey = Symbol.keyFor(obj);
    return symbolKey !== undefined ? Symbol.for(symbolKey) : Symbol(obj.description);
  }

  if (Object.prototype.toString.call(obj) === '[object Date]') {
    const copyDate = new Date(obj.getTime());
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    Object.defineProperties(copyDate, descriptors);
    return copyDate;
  }

  if (Object.prototype.toString.call(obj) === '[object Set]') {
    const copySet = new Set;
    obj.forEach((val) => copySet.add(copy(val)));
    return copySet;
  }

  if (Object.prototype.toString.call(obj) === '[object Map]') {
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
  
    if (descriptor) {
      if ('value' in descriptor) {
        if (typeof descriptor.value === 'function') {
          descriptor.value = descriptor.value.bind(copyObject);
        } else {
          descriptor.value = copy(descriptor.value);
        }
      } else {
        if (descriptor.get) descriptor.get = descriptor.get.bind(copyObject);
        if (descriptor.set) descriptor.set = descriptor.set.bind(copyObject);
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

// const sym = Symbol("unique");
// 
// class Parent {
//   parentMethod() {
//     return "I'm a parent method";
//   }
// }
// 
// class Child extends Parent {
//   constructor (name) {
//     super();
//     this.name = name;
//   }
// 
//   get getFn() {
//     return this.name
//   }
// 
//   set seting(name) {
//     this.name = name;
//     return this.name
//   }
// }
// 
// function regularFunction(x) {
//   return x * 2;
// }
// 
// const arrowFunction = (x) => x * 3;
// const boundFunction = regularFunction.bind(null, 5);
// 
// const baseObject = {
//   num: 42,
//   str: "Hello",
//   bool: true,
//   n: null,
//   u: undefined,
//   bigInt: BigInt(9007199254740991),
//   sym,
//   arr: [1, "text", { key: "value" }, [2, 3]],
//   set: new Set([1, 2, { deep: "object" }]),
//   map: new Map([
//     ["key1", "value1"],
//     [sym, "symbolKey"],
//     [{ objKey: "yes" }, { objValue: "yes" }],
//   ]),
//   fn: regularFunction,
//   arrowFn: arrowFunction,
//   boundFn: boundFunction,
//   method() {
//     return "object method";
//   },
// };
// 
// Object.defineProperty(baseObject, "hiddenProp", {
//   value: "secret",
//   writable: false,
//   enumerable: false,
//   configurable: false,
// });
// 
// const childInstance = new Child("Asel");
// 
// const extendedObject = Object.create(baseObject);
// extendedObject.extra = "additional property";
// 
// const testObject = {
//   baseObject,
//   childInstance,
//   extendedObject,
// };
// 
// const copytestObject = copy(testObject);


// const obj = {
//   _value: 10,
//   get value() {
//     return this._value;
//   },
//   set value(val) {
//     this._value = val;
//   }
// };

const obj = {
  ids: [1, 2, 3, 4],
  createDate: new Date(),
  releaseDate: null,
  items: {
    itemOne: {
      name: 'one'
    },
    itemTwo: {
      name: 'two'
    }
  },
  getCreatedDate() { return this.createDate}
};

const obj1 = copy(obj)

const copiedObj = copy(obj);
// const date = new obj1.createDate.Date; // 20
// console.log(date); // 20
console.log(copiedObj.createDate.toString()); // 20
// console.log(copiedObj.createDate); // 20
// console.log(copiedObj.getCreatedDate); // 20
// console.log(obj.getCreatedDate); // 10 (оригинал не изменился)
// console.log(obj.getCreatedDate === copiedObj.getCreatedDate); // 10 (оригинал не изменился)
