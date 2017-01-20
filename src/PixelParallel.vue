<template>
  <div id="pixelParallel">
    <panel :config="config" :on-image-change="handleImageChange" :on-disable-click="handleDisableClick" />

    <overlay :config="config" :image="image" />
  </div>

</template>

<script>
import Mousetrap from 'mousetrap';
import './../node_modules/mousetrap/plugins/pause/mousetrap-pause.js';
import DB from './utils/db.js';
import utils from './utils/utils.js';
import Panel from './components/Panel.vue';
import Overlay from './components/Overlay.vue';

const db = new DB();

const mousetrap = {
  main: new Mousetrap(window),
  panel: null
};

export default {
  name: 'pixelParallel',
  data () {
    return {
      enabled: true,
      config: {
        currentPane: 'image',
        visible: true,
        minimized: true,
        horizontalGrid: {
          enabled: false,
          width: 960,
          columns: 12,
          gutter: 30,
          opacity: .2
        },
        verticalGrid: {
          enabled: false,
          gutter: 30,
          opacity: .1

        },
        rulers: {
          enabled: false,
          x: 10,
          y: 10
        },
        image: {
          top: 0,
          left: 0,
          opacity: .5,
          scale: 1,
          difference: false,
          lock: false,
          enabled: true
        },
        position: {
          x: {
            name: 'right',
            value: .5
          },
          y: {
            name: 'bottom',
            value: 1
          }
        }
      },
      image: {
        base64string: null,
        type: null
      }
    }
  },

  beforeCreate() {
    db.getProps().then((config) => {
      this.config = utils.mergeDeep(this.config, config);
    }).catch(() => {
      // No entry in the db
      this.config.minimized = false;
    });

    db.getImage().then((imageObject) => {
      this.image = imageObject;
    }).catch(() => {});

    if ('chrome' in window && 'extension' in chrome) {
      chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {

        switch (msg) {
          case 'enable':
            this.enable();
            break;

          case 'disable':
            this.disable();
            break;

          case 'reloadBindings':
            this.reloadBindings();
            break;
        }
      });
    }
  },
  mounted() {
    if ('chrome' in window && 'extension' in chrome) {
      this.disable();
      chrome.runtime.sendMessage('isEnabled', (response) => {
        if (response === true) {
          this.enable();
        }
      });
    } else {
      this.enable();
    }

    this.reloadBindings();
  },

  watch: {
    config: {
      handler(newVal) {
        db.setProps(newVal);
      },
      deep: true
    },
    image: {
      handler(newVal) {
        db.setImage(newVal);
      }
    }
  },

  methods: {
    disable() {
      if (!this.enabled) {
        return;
      }

      this.enabled = false;

      if (mousetrap.main) mousetrap.main.pause();
      if (mousetrap.panel) mousetrap.panel.pause();

      this.$children[0].detach();

      document.body.removeChild(this.$el);
    },
    enable() {
      if (this.enabled) {
        return;
      }

      this.enabled = true;

      if (mousetrap.main) mousetrap.main.unpause();
      if (mousetrap.panel) mousetrap.panel.unpause();

      document.body.appendChild(this.$el);

      this.$children[0].attach();

      this.reloadBindings();
    },
    handleImageChange(imageObject) {
      this.image = imageObject;
    },
    handleDisableClick() {
      if ('chrome' in window && 'runtime' in chrome && 'sendMessage' in chrome.runtime) {
        chrome.runtime.sendMessage('panelDisabled');
      }

      this.disable();
    },
    bindKeyboard(bindings, element) {
      const instance = Mousetrap(element || window);

      if (mousetrap.main) {
        mousetrap.main.reset();
      }

      if (mousetrap.panel) {
        mousetrap.panel.reset();
      }

      setTimeout(() => {
        Object.keys(bindings).forEach((key) => {
          const keyString = bindings[key].base ? `ctrl+alt+${bindings[key].key}` : bindings[key].key;
          const keyStringWithShift = bindings[key].base ? `ctrl+alt+shift+${bindings[key].key}` : `shift+${bindings[key].key}`;

          instance
            .bind(keyString, (event) => {
              event.preventDefault();

              switch (key) {
                case 'minimize':
                  this.config.minimized = !this.config.minimized;
                  break;

                case 'toggle':
                  this.config.visible = !this.config.visible;
                  break;

                case 'lock':
                  this.config.image.lock = !this.config.image.lock;
                  break;

                case 'resetPosition':
                  this.config.image.top = 0;
                  this.config.image.left = 0;
                  break;

                case 'left':
                  this.config.image.left -= 1;
                  break;

                case 'right':
                  this.config.image.left += 1;
                  break;

                case 'up':
                  this.config.image.top -= 1;
                  break;

                case 'down':
                  this.config.image.top += 1;
                  break;
              }
            });

          if (key === 'left' || key === 'right' || key === 'up' || key === 'down') {
            instance
              .bind(keyStringWithShift, (event) => {
                event.preventDefault();

                switch (key) {
                  case 'left':
                    this.config.image.left -= 10;
                    break;

                  case 'right':
                    this.config.image.left += 10;
                    break;

                  case 'up':
                    this.config.image.top -= 10;
                    break;

                  case 'down':
                    this.config.image.top += 10;
                    break;
                }
              });
          }
        });

        if (element) {
          mousetrap.panel = instance;
        } else {
          mousetrap.main = instance;
        }
        
      });
    },
    reloadBindings() {
      const defaultBindings = {
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

      if (mousetrap.main) {
        mousetrap.main.reset();
      }

      if (mousetrap.panel) {
        mousetrap.panel.reset();
      }

      if ('chrome' in window && 'storage' in chrome && 'sync' in chrome.storage) {
        chrome.storage.sync.get(defaultBindings, (bindings) => {
          this.bindKeyboard(bindings);

          if (this.$children[0].isolatorElement.contentWindow) {
            this.bindKeyboard(bindings, this.$children[0].isolatorElement.contentWindow);
          }
        });
      } else {
        this.bindKeyboard(defaultBindings);

        if (this.$children[0].isolatorElement.contentWindow) {
          this.bindKeyboard(defaultBindings, this.$children[0].isolatorElement.contentWindow);
        }
      }
    }
  },

  components: {
    Panel,
    Overlay
  }
}
</script>

<style>
</style>
