function getFileTypeFromBase64string(input) {
  return input.replace('data:', '').split(';base64')[0];
}

function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => reject;

    reader.readAsDataURL(file);
  });
}

function getImageFromPasteEvent(event) {
  return new Promise((resolve, reject) => {
    if (!event.clipboardData.items) {
      const waitInterval = setInterval(() => {
        if (this.event.target.children.length > 0) {
          clearInterval(waitInterval);

          resolve({
            base64string: this.event.target.children[0].src,
            type: getFileTypeFromBase64string(this.event.target.children[0].src)
          });

          this.event.target.innerHTML = '';
        }
      }, 1);

    } else {
      Array.from(event.clipboardData.items).some((item) => {
        if (item.kind === 'file' && (item.type === 'image/png' || item.type === 'image/jpeg')) {
          const file = item.getAsFile();

          const imageType = item.type;

          getBase64FromFile(file).then((result) => {
            resolve({
              base64string: result,
              type: imageType
            });
          });

          return true;
        }
      });
    }
  });
}

function getImageFromInputEvent(event) {
  return new Promise((resolve, reject) => {
    if (event.target.files && event.target.files[0]) {
      getBase64FromFile(event.target.files[0]).then((result) => {
        resolve({
          base64string: result,
          type: event.target.files[0].type
        });
      });
    } else {
      reject();
    }
  });
}


/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return target;
}

export default {
  getImageFromPasteEvent,
  getImageFromInputEvent,
  mergeDeep
};
