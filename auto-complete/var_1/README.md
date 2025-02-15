# Анализ функции `createAutoComplete`

## 🔹 Описание кода
Этот код реализует **автодополнение** на основе **префиксного дерева (Trie)** с кешированием для ускорения поиска.

---

## 📌 Функция `createTrie()`
Создает объект `trie`, содержащий:
- **`root`** — корневой узел в виде `Map`.
- **`cache`** — кеш на основе `WeakMap` для хранения результатов поиска.

### 1️⃣ `insertItem(word)` — вставка слова в Trie
```js
function insertItem(word) {
    let node = root;
    for (let i = 0; i < word.length; i++) {
        const char = word[i].toLowerCase();
        !node.has(char) && node.set(char, new Map());
        node = node.get(char);
    }
    if(!node.has('isEndWord')) {
        node.set('isEndWord', true);
        node.set('words', []);
    }
    node.get('words').push(word);
    cache.delete(root);
}
```
- Проходим по символам слова, создавая узлы `Map`.
- Устанавливаем метку `isEndWord` для конца слова.
- Добавляем слово в массив `words`.
- Удаляем кеш, так как данные изменились.

---

### 2️⃣ `searchItem(wordPart)` — поиск слов по префиксу
```js
function searchItem(wordPart) {
    if (typeof wordPart !== 'string' || !wordPart.length) return [];
    const copyWordPart = wordPart.toLowerCase();
    let node = root;
    for (const char of copyWordPart) {
        if(!node.has(char)) return [];
        node = node.get(char);
    }
    if (cache.has(node)) return cache.get(node);
    const result = collectWords(node, copyWordPart);
    cache.set(node, result);
    return result;
}
```
- Ищем узел, соответствующий `wordPart`.
- Если узел есть в `cache`, возвращаем кешированный результат.
- Иначе собираем все слова, начинающиеся с `wordPart`.
- Сохраняем результат в `cache`.

---

### 3️⃣ `collectWords(node, wordPart, result = [])` — сбор слов
```js
function collectWords(node, wordPart, result = []) {
    node instanceof Map && node.get('isEndWord') && result.push(...node.get('words'));
    for (const [char, childNode] of node) {
        char !== 'isEndWord' && char !== 'words' && collectWords(childNode, `${wordPart}${char}`, result);
    }
    return result;
}
```
- Рекурсивно собираем слова, проходя по всем узлам `Map`.
- Добавляем слова только из узлов с `isEndWord`.

---

## 📌 Функция `createAutoComplete(words)`
```js
function createAutoComplete(words) {
    const trie = createTrie();
    words.forEach(trie.insertItem);
    return trie.searchItem;
}
```
- Создает Trie.
- Заполняет его словами из `words`.
- Возвращает функцию поиска `searchItem`.

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
- **O(n)** для вставки `n` слов.
- **O(m)** для поиска (где `m` — длина префикса).
- Используется `Map`, а не объекты `{}` для быстрого доступа.
- `WeakMap` кеширует результаты, ускоряя повторные запросы.
- Подходит для **автодополнения** и **поиска по префиксу**. 🚀

