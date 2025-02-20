// class TrieNode {
//     constructor() {
//         this.children = {};
//         this.words = [];
//     }
// }
// 
// function searchword(query) {
//     if (!query) return [];
// 
//     let currentNode = this;
// 
//     for (let char of query.toLowerCase()) {
//         if (!currentNode.children[char]) return [];
//         currentNode = currentNode.children[char];
//     }
// 
//     return currentNode.words;
// }
// 
// function createAutoComplete(data) {
//     const root = new TrieNode();
// 
//     for (let word of data) {
//         let currentNode = root;
// 
//         for (const char of word.toLowerCase()) {
//             if (!currentNode.children[char]) currentNode.children[char] = new TrieNode();
//             currentNode = currentNode.children[char];
//             currentNode.words.push(word);
//         }
//     }
// 
//     return searchword.bind(root);
// }  
// 
// module.exports = { createAutoComplete };
//   

class TrieNode {
    constructor() {
        this.children = {};
    }
}

function searchword(query) {
    if (!query) return [];

    let currentNode = this;

    for (let char of query.toLowerCase()) {
        if (!currentNode.children[char]) return [];
        currentNode = currentNode.children[char];
    }

    // Only return the words from the leaf nodes
    return currentNode.words || [];
}

function createAutoComplete(data) {
    const root = new TrieNode();

    for (let word of data) {
        let currentNode = root;

        for (const char of word.toLowerCase()) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }

        // Store the word only in the leaf node
        if (!currentNode.words) {
            currentNode.words = [];
        }
        currentNode.words.push(word);
    }

    return searchword.bind(root);
}

module.exports = { createAutoComplete };
