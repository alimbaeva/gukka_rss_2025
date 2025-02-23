> "На этой неделе в рамках курса Short Track для EPAM я реализовала функцию > deepCopy. В процессе работы была обеспечена корректная обработка таких объектов, как Map, Set, а также глобальных Symbol, созданных через Symbol.for.

> Для копирования функций и стрелочных функций я проверяла наличие прототипа с>  помощью Object.hasOwnProperty('prototype'), так как у стрелочных функций его нет. Аргументы сохранялись с помощью метода apply, так как второй аргумент — это массив.

> Также был создан новый объект, наследующий тот же прототип, что и оригинал, > с помощью Object.setPropertyOf и Object.getPropertyOf. Для копирования всех свойств функции использовался Object.defineProperty, а для точного определения типа объекта — Object.prototype.toString.

> Особое внимание было уделено сохранению методов get и set, если они присутствовали
---

```markdown
# 📄 Разбор функции глубокого копирования `copy`

## 🎯 Цель функции

Функция `copy` реализует **глубокое копирование** объектов в JavaScript, учитывая различные типы данных, включая примитивы, массивы, функции и специальные структуры данных (`Map`, `Set`, `Date`, `Symbol`).  

---

## 🔍 Этапы работы функции

### ✅ 1. Обработка `Symbol`
```js
if (typeof obj === "symbol") {
  const symbolKey = Symbol.keyFor(obj);
  return symbolKey !== undefined ? Symbol.for(symbolKey) : Symbol(obj.description);
}
```
- Если передан объект типа `Symbol`:
  - Для глобальных символов (созданных через `Symbol.for`) возвращает тот же символ по ключу.
  - Для локальных символов создает новый символ с тем же описанием.

---

### 📅 2. Обработка объектов типа `Date`
```js
if (Object.prototype.toString.call(obj) === '[object Date]') {
  const copyDate = new Date(obj.getTime());
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  Object.defineProperties(copyDate, descriptors);
  return copyDate;
}
```
- Создает новый объект `Date` с тем же временем.
- Копирует все свойства и дескрипторы из исходного объекта.

---

### 🗂️ 3. Копирование `Set` и `Map`
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
- Для `Set`: создает новый `Set` и рекурсивно копирует каждый элемент.
- Для `Map`: копирует ключи и значения рекурсивно.

---

### 🔧 4. Обработка функций
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
- Проверяет наличие прототипа (у стрелочных функций его нет).
- Создает функцию-копию с передачей контекста и аргументов.
- Копирует прототип и свойства исходной функции.

---

### 📚 5. Обработка массивов
```js
if (Array.isArray(obj)) return obj.map((item) => copy(item));
```
- Возвращает новый массив, копируя каждый элемент рекурсивно.

---

### ❓ 6. Обработка примитивов и `null`
```js
if (obj == null || typeof obj !== 'object') return obj;
```
- Примитивные типы данных и `null` возвращаются без изменений.

---

### 🏗️ 7. Глубокое копирование объектов
```js
const proto = Object.getPrototypeOf(obj);
const copyObject = Object.create(proto);
const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
```
- Создает новый объект с таким же прототипом.
- Получает список всех свойств и символов.

---

### 🔄 8. Копирование дескрипторов свойств
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
- Копирует свойства объекта вместе с дескрипторами.
- Связывает функции и геттеры/сеттеры с новым объектом.

---

### ⚙️ 9. Копирование методов из цепочки прототипов
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
- Рекурсивно копирует все методы из цепочки прототипов.
- Методы связываются с новым объектом через `bind`.

---

### 🎯 10. Возвращение скопированного объекта
```js
return copyObject;
```
- Возвращает полностью скопированный объект.

---

## ✅ Вывод

Функция `copy` позволяет создать точную глубокую копию переданного объекта с сохранением всех его особенностей:  
- ✔️ Копирует примитивы и объекты  
- ✔️ Поддерживает специальные типы данных (`Symbol`, `Date`, `Set`, `Map`)  
- ✔️ Корректно копирует функции и их прототипы  
- ✔️ Сохраняет дескрипторы свойств, включая геттеры и сеттеры  

Эта функция подходит для создания полной копии сложных объектов с сохранением всех их свойств и методов.  
```
