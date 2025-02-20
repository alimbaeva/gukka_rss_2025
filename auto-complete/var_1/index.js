function createTrie() {
    const root = new Map();
    const cache = new WeakMap();

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

    function collectWords(node, wordPart, result = []) {
        node instanceof Map && node.get('isEndWord') && result.push(...node.get('words'));
        for (const [char, childNode] of node) {
            char !== 'isEndWord' && char !== 'words' && collectWords(childNode, `${wordPart}${char}`, result);
        }
        return result;
    }

    return {insertItem, searchItem};
}

function  createAutoComplete(words) {
    const trie = createTrie();
    words.forEach(trie.insertItem);
    return trie.searchItem;
}

module.exports = {createAutoComplete};
