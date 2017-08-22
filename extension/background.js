var enabledTabs = [];

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
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


chrome.manifest = chrome.app.getDetails();

var injectIntoTab = function (tab) {
    // You could iterate through the content scripts here
    var scripts = chrome.manifest.content_scripts[0].js;
    var i = 0, s = scripts.length;
    for( ; i < s; i++ ) {
        chrome.tabs.executeScript(tab.id, {
            file: scripts[i]
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

var port;

// Attempt to reconnect
var reconnectToExtension = function () {
    // Reset port
    port = null;
    // Attempt to reconnect after 1 second
    setTimeout(connectToExtension, 1000 * 1);
};

// Attempt to connect
var connectToExtension = function () {

    // Make the connection
    port = chrome.extension.connect({name: "my-port"});

    // When extension is upgraded or disabled and renabled, the content scripts
    // will still be injected, so we have to reconnect them.
    // We listen for an onDisconnect event, and then wait for a second before
    // trying to connect again. Becuase chrome.extension.connect fires an onDisconnect
    // event if it does not connect, an unsuccessful connection should trigger
    // another attempt, 1 second later.
    port.onDisconnect.addListener(reconnectToExtension);

};

// Connect for the first time
connectToExtension();
