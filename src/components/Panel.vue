<template>
  <div :class="['pixelParallel-panel', {'pixelParallel-panel-minimized': config.minimized, 'pixelParallel-panel-dragging': this.dragging}]" v-draggable="{x: true, y: true, onDragEnd: handleDragEnd, onDragMove: handleDragMove, onDragStart: handleDragStart}" :style="panelInlineStyles">

    <div class="pixelParallel-panel-inner">
      <div class="pixelParallel-panel-handle"></div><!-- /.pixelParallel-panel-handle -->

      <iframe class="pixelParallel-panel-isolator" frameborder="0"></iframe>

      <div :class="['pixelParallel-panel-content', {'pixelParallel-panel-content-minimized': config.minimized}]">
        <droparea title="Drop Here" :on-upload="handleImageChange" />

        <header class="header">
          <div class="panel-control">
            <ul>
              <li>
                <a href="#" :class="{'active': !config.visible}" @click.prevent="config.visible = !config.visible" title="Hide All Elements"><i class="ico ico-eye-slash-small"></i></a>
              </li>

              <li>
                <a href="#" @click.prevent="config.minimized = !config.minimized">
                  <i class="ico ico-minimize"></i>

                  <i class="ico ico-maximize"></i>
                </a>
              </li>

              <li>
                <a href="#" @click.prevent="handleCloseClick"><i class="ico ico-close"></i></a>
              </li>
            </ul>
          </div><!-- /.panel-control -->

          <nav class="nav">
            <ul>
              <li :class="{'current': config.currentPane === 'image'}">
                <a href="#" @click.prevent="setCurrentPane('image')">Image</a>
              </li>

              <li :class="{'current': config.currentPane === 'grid'}">
                <a href="#" @click.prevent="setCurrentPane('grid')">Grid <span class="ad">and Rulers</span></a>
              </li>
            </ul>
          </nav><!-- /.nav -->
        </header><!-- /.header -->


        <div class="main">
          <div class="panes">
            <div class="pane" v-if="config.currentPane === 'image'">
              <div class="row row-head row-head-large-gutter">
                <div class="col col-2-of-5">
                  <upload-button title="Upload Image" :on-upload="handleImageChange" />
                </div><!-- /.col col-2-of-5 -->

                <div class="col col-1-of-5">
                  <span class="elements-divider">or</span>
                </div><!-- /.col col-1-of-5 -->

                <div class="col col-2-of-5">
                  <paste-box title="Paste Here" :on-paste="handleImageChange" />
                </div><!-- /.col col-2-of-5 -->
              </div><!-- /.row -->

              <div class="row row-head">
                <div class="col col-1-of-4">
                  <number v-model="config.image.top" title="Top" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.image.left" title="Left" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.image.opacity" title="Opacity" :arrows="true" :step=".1" :min="0" :max="1" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.image.scale" title="Scale" :min="0" :max="3" :step=".05" />
                </div><!-- /.col col-1-of-4 -->
              </div><!-- /.row -->

              <div class="row">
                <div class="col">
                  <div class="icon-link-group">
                    <a href="#" class="icon-link" :class="{'active': config.image.difference}" @click.prevent="config.image.difference = !config.image.difference">
                      <i class="ico ico-color"></i>

                      <span class="text">Color Diff</span>
                    </a>

                    <a href="#" class="icon-link" :class="{'active': config.image.lock}" @click.prevent="config.image.lock = !config.image.lock">
                      <i class="ico ico-lock"></i>

                      <span class="text">Lock</span>
                    </a>

                    <a href="#" class="icon-link" :class="{'active': !config.image.enabled}" @click.prevent="config.image.enabled = !config.image.enabled">
                      <i class="ico ico-eye-slash"></i>

                      <span class="text">Hide Image</span>
                    </a>
                  </div><!-- /.icon-link-group -->
                </div><!-- /.col -->
              </div><!-- /.row -->
            </div><!-- /.pane -->

            <div class="pane" v-if="config.currentPane === 'grid'">
              <div class="row row-head">
                <div class="col col-1-of-3">
                  <toggle v-model="config.horizontalGrid.enabled" title="Vertical Grid" />
                </div><!-- /.col col-1-of-3 -->

                <div class="col col-1-of-3">
                  <toggle v-model="config.verticalGrid.enabled" title="Horizontal Grid" />
                </div><!-- /.col col-1-of-3 -->

                <div class="col col-1-of-3">
                  <toggle v-model="config.rulers.enabled" title="Rulers" :action="{text: '(reset)', handler: this.handleRulersReset}" />
                </div><!-- /.col col-1-of-3 -->
              </div><!-- /.row -->

              <div class="row row-head">
                <div class="col col-1-of-4">
                  <number v-model="config.horizontalGrid.width" title="Width" :min="0" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.horizontalGrid.columns" title="Columns" :min="0" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.horizontalGrid.gutter" title="Gutter" :min="0" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.horizontalGrid.opacity" title="Opacity" :arrows="true" :step=".1" :min="0" :max="1" />
                </div><!-- /.col col-1-of-4 -->
              </div><!-- /.row -->

              <div class="row">
                <div class="col col-1-of-4">
                  <number v-model="config.verticalGrid.gutter" title="Height" :min="0" />
                </div><!-- /.col col-1-of-4 -->

                <div class="col col-1-of-4">
                  <number v-model="config.verticalGrid.opacity" title="Opacity" :arrows="true" :step=".1" :min="0" :max="1" />
                </div><!-- /.col col-1-of-4 -->
              </div><!-- /.row -->
            </div><!-- /.pane -->
          </div><!-- /.panes -->
        </div><!-- /.main -->
      </div>
    </div>
  </div>
</template>

<script>
import panelFonts from '../styles/panel-fonts.js';
import panelIcons from '../styles/panel-icons.js';
import panelStyles from '../styles/panel.js';
import Toggle from './Toggle.vue';
import Number from './Number.vue';
import UploadButton from './UploadButton.vue';
import Droparea from './Droparea.vue';
import PasteBox from './PasteBox.vue';
import draggableDirective from '../directives/draggable.js';


const dragPositions = {
  start: {
    x: 0,
    y: 0
  },
  element: {
    x: 0,
    y: 0
  },
  last: {
    x: 0,
    y: 0
  },
  max: {
    x: 0,
    y: 0
  }
};

export default {
  name: 'panel',

  props: ['config', 'onImageChange', 'onDisableClick'],

  data() {
    return {
      contentElement: null,
      styleElement: null,
      isolatorElement: null,
      dragging: false
    }
  },

  mounted () {
    this.isolatorElement = this.$el.querySelector('.pixelParallel-panel-isolator');
    this.contentElement = this.$el.querySelector('.pixelParallel-panel-content');
    this.styleElement = document.createElement('style');

    this.styleElement.textContent = panelFonts;
    this.styleElement.textContent += panelIcons;
    this.styleElement.textContent += panelStyles;

    this.attach();

    // Fix Firefox issue
    this.isolatorElement.addEventListener('load', () => {
      this.attach();
    });
  },

  methods: {
    handleDragEnd (newPosition, event) {
      const elementBoundingRect = this.$el.getBoundingClientRect();
      const windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      };

      let propNameX = null;
      let propNameY = null;
      let propValX = 0;
      let propValY = 0;

      if (dragPositions.last.x < windowSize.x / 2) {
        propNameX = 'left';

        propValX = dragPositions.last.x / window.innerWidth * 100;
      } else {
        propNameX = 'right';

        this.$el.style.left = 'auto';
        propValX = (windowSize.x - dragPositions.last.x - elementBoundingRect.width) / window.innerWidth * 100;
      }

      if (dragPositions.last.y < windowSize.y / 2) {
        propNameY = 'top';

        propValY = dragPositions.last.y / window.innerHeight * 100;
      } else {
        propNameY = 'bottom';

        this.$el.style.top = 'auto';
        propValY = (windowSize.y - dragPositions.last.y - elementBoundingRect.height) / window.innerHeight * 100;
      }

      this.$el.style.transform = 'none';
      this.$el.style[propNameX] = propValX + '%';
      this.$el.style[propNameY] = propValY + '%';

      this.config.position.x.name = propNameX;
      this.config.position.x.value = propValX;
      this.config.position.y.name = propNameY;
      this.config.position.y.value = propValY;

      this.dragging = false;
    },
    handleDragMove (event) {
      dragPositions.last.x = Math.min(dragPositions.max.x, Math.max(0, (dragPositions.element.x + event.screenX - dragPositions.start.x)));
      dragPositions.last.y = Math.min(dragPositions.max.y, Math.max(0, (dragPositions.element.y + event.screenY - dragPositions.start.y)));

      this.$el.style.transform = `translate(${dragPositions.last.x}px, ${dragPositions.last.y}px)`;
    },
    handleDragStart (event) {
      const elementBoundingRect = this.$el.getBoundingClientRect();
      dragPositions.start.x = event.screenX;
      dragPositions.start.y = event.screenY;
      dragPositions.element.x = elementBoundingRect.left;
      dragPositions.element.y = elementBoundingRect.top;
      dragPositions.max.x = window.innerWidth - elementBoundingRect.width;
      dragPositions.max.y = window.innerHeight - elementBoundingRect.height;

      this.$el.style.left = '0px';
      this.$el.style.top = '0px';
      this.$el.style.transform = `translate(${dragPositions.element.x}px, ${dragPositions.element.y}px)`;
      this.$el.style.right = 'auto';
      this.$el.style.bottom = 'auto';

      this.dragging = true;
    },
    setCurrentPane(paneKey) {
      this.config.currentPane = paneKey;
    },
    handleCloseClick() {
      this.onDisableClick();
    },
    handleImageChange(imageObject) {
      this.onImageChange(imageObject);
    },
    handleRulersReset() {
      this.config.rulers.x = 10;
      this.config.rulers.y = 10;
    },
    detach() {
      this.$el.appendChild(this.contentElement);
      this.$el.appendChild(this.styleElement);
    },
    attach() {
      this.isolatorElement.contentDocument.body.appendChild(this.contentElement);
      this.isolatorElement.contentDocument.head.appendChild(this.styleElement);

      this.$children[0].setIsolatorDoc(this.isolatorElement.contentDocument);
    }
  },
  computed: {
    panelInlineStyles () {
      const styleObject = {};

      styleObject[this.config.position.x.name] = this.config.position.x.value + '%';
      styleObject[this.config.position.y.name] = this.config.position.y.value + '%';
      styleObject.opacity = 1;

      return styleObject;
    }
  },
  directives: {
    draggable: draggableDirective
  },
  components: {
    Toggle,
    Number,
    UploadButton,
    Droparea,
    PasteBox
  }
}
</script>

<style scoped>
  .pixelParallel-panel { position: fixed; right: 10px; bottom: 10px; z-index: 2147483647; width: 375px; height: 265px; transform: translate(0%, 0); background: #fff; transition: width 200ms ease-out, height 200ms ease-out; will-change: top, left, width, height, transform; opacity: 0; }

  .pixelParallel-panel-inner { position: relative; overflow: hidden; height: 100%; border: 1px solid #dddedf; box-shadow: 0 2px 10px rgba(0,0,0,.1); box-sizing: border-box; }

  .pixelParallel-panel-handle { position: absolute; top: -10px; right: -10px; z-index: 3; width: 20px; height: 20px; background: red; transform: rotate(45deg); background: linear-gradient(to top, transparent, transparent 50%, #ccc 50%, #ccc); background-size: 100% 2px; cursor: move; }

  .pixelParallel-panel-isolator { border: 0; width: 100%; height: 100%; overflow: hidden; position: relative; }

  .pixelParallel-panel-dragging .pixelParallel-panel-inner { pointer-events: none; }
  .pixelParallel-panel-minimized { width: 112px; height: 50px; transition: width 200ms 150ms ease-out, height 200ms 150ms ease-out; }

  @media (max-width: 395px) {
    .pixelParallel-panel { right: 0; bottom: 0; width: 320px; }
    .pixelParallel-panel-minimized { width: 112px; }
  }
</style>
