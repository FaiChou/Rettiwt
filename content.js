injectScript();
function injectScript() {
  var script = document.createElement('script');
  script.textContent = `console.log('shittt!!');`;
  (document.head || document.documentElement).appendChild(script);
  // script.remove();
}
var storage = chrome.storage.local;
const dashExist = true;
pageDidLoad();
function pageDidLoad() {
  storage.set({dashExist}, function() {
    console.log('Settings saved');
  });
}
function switchDashboard(dashExist) {
  if (dashExist) {
    for (let el of document.querySelectorAll(".dashboard"))
      el.style.visibility = "hidden";
    storage.set({'dashExist': false}, function() {
      console.log('close success!');
    });
  } else {
    for (let el of document.querySelectorAll(".dashboard"))
      el.style.visibility = "visible";
    storage.set({'dashExist': true}, function() {
      console.log('open success!');
    });
  }
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      storage.get('dashExist', function(items) {
        console.log(items.dashExist);
        switchDashboard(items.dashExist);
      });
    }
  }
);
