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
        Array.from(element.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            let originalText = node.textContent.trim();
            let words = originalText.split(' ');
            words.forEach((word, index) => {
              let lowerCaseWord = word.toLowerCase();
              if (dictionary[lowerCaseWord]) {
                words[index] = dictionary[lowerCaseWord];
              }
            });
            node.textContent = words.join(' ');
          }
        });
      });
    })
    .catch(error => console.error('Error fetching or parsing dictionary.json:', error));
}
