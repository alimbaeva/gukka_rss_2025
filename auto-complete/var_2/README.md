# Разбор функции `createAutoComplete`

## 1. Создаем список `lowercaseData`

```js
const lowercaseData = data.map(item => item.toLowerCase());
```

- Преобразуем все слова из массива `data` в нижний регистр.
- Это необходимо, чтобы сделать поиск **регистронезависимым**.
- Получаем массив, где каждый элемент соответствует приведенной к нижнему регистру версии слова из `data`.

---

## 2. Возвращаем анонимную функцию поиска `query`

```js
return function(query) {
```

- Возвращаем функцию, которая выполняет поиск по введенному запросу `query`.
- При каждом вызове эта функция ищет все слова, начинающиеся с `query`.

---

## 3. Проверяем, передан ли `query`

```js
if (!query) return [];
```

- Если `query` пустой (`null`, `undefined`, `''`), возвращаем пустой массив `[]`.
- Это предотвращает ненужные вычисления.

---

## 4. Преобразуем `query` в нижний регистр

```js
const lowerQuery = query.toLowerCase();
```

- Чтобы поиск оставался **регистронезависимым**, приводим `query` к нижнему регистру.

---

## 5. Фильтруем `data` по `query`

```js
return data.filter((item, index) => {
    return lowercaseData[index].startsWith(lowerQuery);
});
```

- Проходимся по `data`, используя `.filter()`.
- Используем `lowercaseData[index]`, чтобы проверить, начинается ли слово с `lowerQuery`.
- Если да — включаем слово в результат.
- Использование индекса позволяет избежать повторного вызова `.toLowerCase()`.

---

## 🔎 Пример работы

```js
const autoComplete = createAutoComplete(["Cat", "Car", "Care", "Dog"]);
console.log(autoComplete("ca")); // ["Cat", "Car", "Care"]
console.log(autoComplete("car")); // ["Car", "Care"]
console.log(autoComplete("do")); // ["Dog"]
console.log(autoComplete("z")); // []
```

---

## 🔥 Вывод

Этот код реализует **автодополнение** без использования **Trie**:

- **O(n)** на фильтрацию (где `n` — количество элементов в `data`).
- Используется массив `lowercaseData`, чтобы избежать повторных вызовов `.toLowerCase()`.

Это **более простая** альтернатива `Trie` для **поиска по префиксу**. 🚀

