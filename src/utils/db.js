import PouchDB from 'pouchdb';

export default class DB {
  constructor() {
    this.dev = false;

    this.db = new PouchDB('PixelParallel', {
      auto_compaction: true,
      revs_limit: 1
    });

    // this.db.destroy();
  }

  storageSet(options) {
    const doc = options.doc;

    return this.storageGet(options, true).then((response) => {
      let rev = null;
      let promise = null;

      if (typeof response !== 'undefined') {
        rev = response._rev;
      }

      doc._rev = rev;
      doc._id = options.docId;

      promise = this.db.put(doc);

      return promise
        .catch((err) => {
          if (this.dev) {
            console.info('Pixel Parallel:', err);
          }
        }).then(() => {
          if (this.dev) {
            this.db.info().then((result) => {
              console.info('Pixel Parallel:', 'db-info', result);
            }).catch((err) => {
              if (this.dev) {
                console.info('Pixel Parallel:', err);
              }
            });
          }
        });
    });
  }

  storageGet(options) {
    const promise = this.db.get(options.docId, {
      attachments: !!options.includeAttachments
    });

    return promise
      .catch((err) => {
        if (err.message !== 'missing') {
          if (this.dev) {
            console.info('Pixel Parallel:', err);
          }
        }
      });
  }
  setImage(imageObject) {
    this.storageSet({
      docId: 'base64string',
      doc: {
        _attachments: {
          'overlay': {
            data: imageObject.base64string.split(',').pop(),
            content_type: imageObject.type
          }
        }
      }
    });
  }

  getImage() {
    return new Promise((resolve, reject) => {
      this.storageGet({docId: 'base64string', includeAttachments: true}).then((response) => {
        if (response && '_attachments' in response && 'overlay' in response._attachments && response._attachments.overlay) {
          const image = response._attachments.overlay;

          resolve({
            base64string: 'data:' + image.content_type + ';base64,' + image.data,
            type: image.content_type
          }, true);
        } else {
          reject();
        }
      });

    });

  }

  setProps(props) {
    this.storageSet({
      docId: 'properties',
      doc: Object.keys(props)
        .filter(key => !key.match(/^_/))
        .reduce((obj, key) => {
          obj[key] = props[key];
          return obj;
        }, {})
    });
  }

  getProps() {
    return new Promise((resolve, reject) => {
      this.storageGet({docId: 'properties'}).then((response) => {
        if (typeof response !== 'undefined') {
          resolve(response);
        } else {
          reject();
        }
      });
    });

  }
};
