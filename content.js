chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.active) {
      replaceTextWithPirate();
    }
  });
  
  function replaceTextWithPirate() {
    fetch(chrome.runtime.getURL('dictionary.json'))
      .then(response => response.json())
      .then(dictionary => {
        document.body.querySelectorAll('*').forEach(element => {
          element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              let originalText = node.textContent.trim();
              let words = originalText.split(' ');
              words.forEach((word, index) => {
                if (dictionary[word.toLowerCase()]) {
                  words[index] = dictionary[word.toLowerCase()];
                }
              });
              node.textContent = words.join(' ');
            }
          });
        });
      })
      .catch(error => console.error('Error fetching or parsing dictionary.json:', error));
  }
  