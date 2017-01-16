var keyBindingsFormElement = document.querySelector('.key-bindings-form');
var keyBindingItems = keyBindingsFormElement.querySelectorAll('.key-bindings-item');
var defaultBindings = {
  minimize: {
    base: true,
    key: 'm'
  },
  toggle: {
    base: true,
    key: 't'
  },
  lock: {
    base: true,
    key: 'l'
  },
  resetPosition: {
    base: true,
    key: '0'
  },
  left: {
    base: true,
    key: 'left'
  },
  right: {
    base: true,
    key: 'right'
  },
  up: {
    base: true,
    key: 'up'
  },
  down: {
    base: true,
    key: 'down'
  }
};

for (var i = 0; i < keyBindingItems.length; i++) {
  var item = keyBindingItems[i];

  (function(item) {
    item.querySelector('input.field').addEventListener('keydown', function(event) {
      if (!isKeyAllowed(event.which)) {
        return;
      }

      this.value = convertKeyCodeToHumanKey(event.which);
    });

    item.querySelector('.toggle').addEventListener('change', function(event) {
      updateToggleState(this);

      if (item.querySelector('.toggle-checkbox').checked) {
        item.classList.remove('base-disabled');
      } else {
        item.classList.add('base-disabled');
      }
    });
  })(item);
}

document.querySelector('.save-trigger').addEventListener('click', function(event) {
  event.preventDefault();

  save(generateBindings(), function() {
    chrome.runtime.sendMessage('bindingsUpdated');

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.remove(tabs[0].id, function() { });
    });
  });
});

document.querySelector('.reset-trigger').addEventListener('click', function(event) {
  event.preventDefault();

  setBindings(defaultBindings);
});

chrome.storage.sync.get(defaultBindings, function(bindings) {
  setBindings(bindings)
});

function generateBindings() {
  var bindings = {};

  for (var i = 0; i < keyBindingsFormElement.length; i++) {
    var isBase = keyBindingsFormElement[i].name.match('-base');
    var key = keyBindingsFormElement[i].name;

    if (isBase) {
      key = keyBindingsFormElement[i].name.replace('-base', '');
    }

    if (!(key in bindings)) {
      bindings[key] = {};
    }

    if (isBase) {
      bindings[key].base = keyBindingsFormElement[i].checked;
    }

    if (!isBase) {
      bindings[key].key = convertUserKeyToConfigKey(keyBindingsFormElement[i].value);
    }
  }

  return bindings;
}

function isKeyAllowed(keyCode) {
  // Above arrow keys
  if (keyCode >= 33 && keyCode <= 36 || keyCode >= 45 && keyCode <= 46) return true;

  // Arrow keys
  if (keyCode >= 37 && keyCode <= 40) return true;

  // Numbers
  if (keyCode >= 48 && keyCode <= 57) return true;
  
  // Letters
  if (keyCode >= 65 && keyCode <= 90) return true;
  
  // Numpad
  if (keyCode >= 96 && keyCode <= 105) return true;
  
  // F keys
  if (keyCode >= 112 && keyCode <= 130) return true;
  
  // Symbol keys
  if (keyCode >= 106 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222) return true;

  return false;
}

function convertKeyCodeToHumanKey(keyCode) {
  switch (keyCode) {
    case 33: // Page Up
      return 'PgUp';

    case 34: // Page Down
      return 'PgDn';

    case 35: // End
      return 'End';

    case 36: // Home
      return 'Home';

    case 45: // Insert
      return 'Ins';

    case 46: // Delete
      return 'Del';

    case 37: // left
      return '←';

    case 38: // up
      return '↑';

    case 39: // right
      return '→';

    case 40: // down
      return '↓';

    case 112: // F1
      return 'f1';

    case 113: // F2
      return 'f2';

    case 114: // F3
      return 'f3';

    case 115: // F4
      return 'f4';

    case 116: // F5
      return 'f5';

    case 117: // F6
      return 'f6';

    case 118: // F7
      return 'f7';

    case 119: // F8
      return 'f8';

    case 120: // F9
      return 'f9';

    case 121: // F10
      return 'f10';

    case 122: // F11
      return 'f11';

    case 123: // F12
      return 'f12';

    case 124: // F13
      return 'f13';

    case 125: // F14
      return 'f14';

    case 126: // F15
      return 'f15';

    case 127: // F16
      return 'f16';

    case 128: // F17
      return 'f17';

    case 129: // F18
      return 'f18';

    case 130: // F19
      return 'f19';
  }

  return '';
}

function convertUserKeyToConfigKey(key) {
  switch (key) {
    case 'PgUp':
      return 'pageup';

    case 'PgDn':
      return 'pagedown';

    case 'End':
      return 'endEnd';

    case 'Home':
      return 'home';

    case 'Ins':
      return 'ins';

    case 'Del':
      return 'del';

    case '←':
      return 'left';

    case '↑':
      return 'up';

    case '→':
      return 'right';

    case '↓':
      return 'down';
  }

  return key;
}

function convertConfigKeyToUserKey(key) {
  switch (key) {
    case 'pageup':
      return 'PgUp';

    case 'pagedown':
      return 'PgDn';

    case 'endEnd':
      return 'End';

    case 'home':
      return 'Home';

    case 'ins':
      return 'Ins';

    case 'del':
      return 'Del';

    case 'left':
      return '←';

    case 'up':
      return '↑';

    case 'right':
      return '→';

    case 'down':
      return '↓';
  }

  return key;
}

function save(bindings, cb) {
  chrome.storage.sync.set(bindings, function(status) {
    cb && cb();
  });
}

function setBindings(bindings) {
  for (var key in bindings) {
    keyBindingsFormElement[key].value = convertConfigKeyToUserKey(bindings[key].key);
    keyBindingsFormElement[key + '-base'].checked = bindings[key].base;

    updateToggleState(keyBindingsFormElement[key + '-base'].parentNode);

    if (bindings[key].base) {
      keyBindingsFormElement[key + '-base'].parentNode.parentNode.parentNode.parentNode.classList.remove('base-disabled');
    } else {
      keyBindingsFormElement[key + '-base'].parentNode.parentNode.parentNode.parentNode.classList.add('base-disabled');
    }
  }
}

function updateToggleState(element) {
  if (element.querySelector('.toggle-checkbox').checked) {
    element.classList.add('toggle-checked');
  } else {
    element.classList.remove('toggle-checked');
  }
}
