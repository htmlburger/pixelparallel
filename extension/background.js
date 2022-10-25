var enabledTabs = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message === 'bindingsUpdated') {
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, 'reloadBindings');
      }
    });
  }

  if (message === 'isEnabled') {
    getActiveTab(function(tabId) {
      sendResponse(isEnabledForTab(tabId));
    });
  }

  if (message === 'panelDisabled') {
    getActiveTab(function(tabId) {
      disableForTab(tabId);
    });
  }

  if (message === 'enablePanel') {
    getActiveTab(function(tabId) {
      enableForTab(tabId);

      chrome.tabs.sendMessage(tabId, 'enable');
    });
  }

  if (message === 'disablePanel') {
    getActiveTab(function(tabId) {
      disableForTab(tabId);

      chrome.tabs.sendMessage(tabId, 'disable');
    });
  }

  return true;
});

function enableForTab(id) {
  if (isEnabledForTab(id)) {
    return;
  }

  enabledTabs.push(id);
}

function disableForTab(id) {
  if (!isEnabledForTab(id)) {
    return;
  }

  enabledTabs.splice(enabledTabs.indexOf(id), 1);
}

function isEnabledForTab(id) {
  return enabledTabs.indexOf(id) > -1;
}

function getActiveTab(cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    cb(tabs[0].id);
  });
}


chrome.manifest = chrome.runtime.getManifest();

var injectIntoTab = function (tab) {
    // You could iterate through the content scripts here
    var scripts = chrome.manifest.content_scripts[0].js;
    for( let i = 0; i < scripts.length; i++ ) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: [scripts[i]]
        });
    }
}

// Get all windows
chrome.windows.getAll({
    populate: true
}, function (windows) {
    var i = 0, w = windows.length, currentWindow;
    for( ; i < w; i++ ) {
        currentWindow = windows[i];
        var j = 0, t = currentWindow.tabs.length, currentTab;
        for( ; j < t; j++ ) {
            currentTab = currentWindow.tabs[j];

            if (currentTab.url && !currentTab.url.match(/(chrome):\/\//gi) ) {
                injectIntoTab(currentTab);
            }
        }
    }
});
