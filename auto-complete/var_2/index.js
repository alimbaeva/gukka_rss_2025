function createAutoComplete(data) {
    const lowercaseData = data.map(item => item.toLowerCase());
  
    return function(query) {
        if (!query) return [];
  
        const lowerQuery = query.toLowerCase();
      
        return data.filter((item, index) => {
            return lowercaseData[index].startsWith(lowerQuery);
        });
    };
}
  
module.exports = { createAutoComplete };

