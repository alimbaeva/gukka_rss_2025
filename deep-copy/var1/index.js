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
    return obj.bind(obj);
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

class Parent {
    constructor(parentName) {
      this.parentName = parentName;
    }
    parentMethod() {
      return `Parent method: ${this.parentName}`;
    }
  }
  
  class Child extends Parent {
    constructor(parentName, childName) {
      super(parentName);
      this.childName = childName;
    }
    childMethod() {
      return `Child method: ${this.childName}`;
    }
  }
  
  const instance = new Child("Parent1", "Child1");
  console.log(instance.parentMethod()); // ✅ "Parent method: Parent1"
  console.log(instance.childMethod());

//   const instance = new Child("Parent1", "Child1");
const copiedInstance = copy(instance);

console.log(copiedInstance.childMethod());  // ✅ "Child method: Child1"
console.log(copiedInstance.parentMethod()); // ✅ "Parent method: Parent1"
console.log(copiedInstance instanceof Child);  // ✅ true
console.log(copiedInstance instanceof Parent); 