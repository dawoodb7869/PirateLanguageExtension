let isActive = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  isActive = !isActive;
  chrome.browserAction.setIcon({
    path: isActive ? {
      "16": "images/icon-active-16.png",
      "48": "images/icon-active-48.png",
      "128": "images/icon-active-128.png"
    } : {
      "16": "images/icon-inactive-16.png",
      "48": "images/icon-inactive-48.png",
      "128": "images/icon-inactive-128.png"
    }
  });
  
  chrome.tabs.sendMessage(tab.id, { active: isActive });
});
