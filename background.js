let isActive = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  isActive = !isActive;
  chrome.browserAction.setIcon({
    path: isActive ? {
      "16": "icon-active-16.png",
      "48": "icon-active-48.png",
      "128": "icon-active-128.png"
    } : {
      "16": "icon-inactive-16.png",
      "48": "icon-inactive-48.png",
      "128": "icon-inactive-128.png"
    }
  });
  
  chrome.tabs.sendMessage(tab.id, { active: isActive });
});
