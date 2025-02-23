> ‘This week, as part of the Short Track course for EPAM, I implemented the deepCopy function. The process ensured that objects such as Map, Set, and global Symbols created via Symbol.for were handled correctly.

> For copy functions and arrow functions, I checked for the presence of a prototype using Object.hasOwnProperty(‘prototype’), since arrow functions don't have one. The arguments were stored using the apply method, since the second argument is an array.

> A new object was also created, inheriting the same prototype as the original, using Object.setPropertyOf and Object.getPropertyOf. Object.defineProperty was used to copy all the properties of the function, and Object.prototype.toString was used to precisely define the type of the object.

> Special care was taken to preserve the get and set methods if they were present

---

```markdown
# 📄 Parsing the `copy` deep copy function

## 🎯 Purpose of the function
The `copy` function implements **deep copying** of objects in JavaScript, considering various data types including primitives, arrays, functions and special data structures (`Map`, `Set`, `Date`, `Symbol`). 

---

## 🔍 Stages of the function

### ✅ 1. Processing `Symbol`
```js
if (typeof obj === "symbol") {
  const symbolKey = Symbol.keyFor(obj);
  return symbolKey !== undefined ? Symbol.for(symbolKey) : Symbol(obj.description);
}
```
- If an object of type `Symbol` is passed:
  - For global symbols (created via `Symbol.for`), returns the same symbol by key.
  - For local symbols, creates a new symbol with the same description.

---

### 📅 2. Processing of objects of `Date` type
```js
if (Object.prototype.toString.call(obj) === '[object Date]') {
  const copyDate = new Date(obj.getTime());
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  Object.defineProperties(copyDate, descriptors);
  return copyDate;
}
```
- Creates a new `Date` object with the same time.
- Copies all properties and descriptors from the original object.

---

### 🗂️ 3. Copying `Set` and `Map`
```js
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
```
- For `Set`: creates a new `Set` and recursively copies each item.
- For `Map`: copies keys and values recursively.

---

### 🔧 4. Function processing
```js
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
```
- Checks if a prototype exists (arrow functions do not have one).
- Creates a copy function with passing the context and arguments.
- Copies the prototype and properties of the original function.

---

### 📚 5. Array processing
```js
if (Array.isArray(obj)) return obj.map((item) => copy(item));
```
- Returns a new array by copying each element recursively.

---

### ❓ 6. Processing of primitives and `null`
```js
if (obj == null || typeof obj !== 'object') return obj;

``Primitive data types and `null` are returned unchanged.

---

### 🏗️ 7. Deep copying of objects
```js
const proto = Object.getPrototypeOf(obj);
const copyObject = Object.create(proto);
const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
```
- Creates a new object with the same prototype.
- Gets a list of all properties and symbols.

---

### 🔄 8. Copying property descriptors
```js
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
  if (descriptor) {
    if ('value' in descriptor) {
      descriptor.value = typeof descriptor.value === 'function'
        ? descriptor.value.bind(copyObject)
        : copy(descriptor.value);
    } else {
      if (descriptor.get) descriptor.get = descriptor.get.bind(copyObject);
      if (descriptor.set) descriptor.set = descriptor.set.bind(copyObject);
    }
  }
  Object.defineProperty(copyObject, key, descriptor);
}
```
- Copies object properties along with descriptors.
- Binds functions and getters/setters to the new object.

---

### ⚙️ 9. Copying methods from the prototype chain
```js
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
```
- Recursively copies all methods from the prototype chain.
- Methods are linked to the new object via `bind`.

---

### 🎯 10. Return the copied object
```js
return copyObject;
```
- Returns the fully copied object.

---

## ✅ Conclusion

The `copy` function allows you to create an exact deep copy of a passed object while preserving all its features:  
- ✔️ Copies primitives and objects  
- ✔️ Supports special data types (`Symbol`, `Date`, `Set`, `Map`)  
- ✔️ Copies functions and their prototypes correctly  
- ✔️ Maintains property descriptors, including getters and setters.  

This function is suitable for creating a complete copy of complex objects while preserving all their properties and methods.
```
