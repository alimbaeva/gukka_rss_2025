class TrieNode {
    constructor() {
        this.children = {};
        this.words = [];
    }
}

function createAutoComplete(data) {
    const root = new TrieNode();

    data.forEach((word) => {
        let currentNode = root;

        for (const char of word.toLowerCase()) {
            !currentNode.children[char] && (currentNode.children[char] = new TrieNode());
            currentNode = currentNode.children[char];
            currentNode.words.push(word);
        }
    });

    return function(query) {
        if (!query) return [];

        let currentNode = root;

        for (let char of query.toLowerCase()) {
            if (!currentNode.children[char]) return [];
            currentNode = currentNode.children[char];
        }

        return currentNode.words;
    };
}
    

module.exports = { createAutoComplete };
 
  