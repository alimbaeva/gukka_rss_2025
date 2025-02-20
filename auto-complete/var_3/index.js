

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
    
        for (const char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

        node.isEndOfWord = true;
    }

    searchPrefix(prefix) {
        let node = this.root;
        const results = [];

        for (const char of prefix.toLowerCase()) {
            if (!node.children[char]) {
                return results;
            }
            node = node.children[char];
        }

        this.findWords(node, prefix.toLowerCase(), results);
        return results;
    }

    findWords(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push(prefix);
        }

        for (const char in node.children) {
            if (node.children.hasOwnProperty(char)) {
                this.findWords(node.children[char], prefix + char, results);
            }
        }
    }
}

function createAutoComplete(words) {
    const trie = new Trie();
    words.forEach(word => trie.insert(word));
    return (query) => trie.searchPrefix(query);
}

module.exports = { createAutoComplete };