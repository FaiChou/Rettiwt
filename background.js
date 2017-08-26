chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="#F9FAFC"'
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs);
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});
