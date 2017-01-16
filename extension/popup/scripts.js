document.querySelector('.options-trigger').addEventListener('click', function(event) {
  event.preventDefault();
  chrome.runtime.openOptionsPage();
});

document.querySelector('.enable-trigger').addEventListener('click', function(event) {
  event.preventDefault();
  chrome.runtime.sendMessage('enablePanel');

  document.querySelector('.wrapper').classList.add('extension-enabled');
});

document.querySelector('.disable-trigger').addEventListener('click', function(event) {
  event.preventDefault();
  chrome.runtime.sendMessage('disablePanel');

  document.querySelector('.wrapper').classList.remove('extension-enabled');
});


chrome.runtime.sendMessage('isEnabled', (response) => {
  if (response === true) {
    document.querySelector('.wrapper').classList.add('extension-enabled');
  }
});

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tab) {
  if (tab[0].url.match(/(chrome):\/\//gi)) {
    document.body.classList.add('extension-disabled-for-tab');
  } else {
    document.body.classList.remove('extension-disabled-for-tab');
  }
});