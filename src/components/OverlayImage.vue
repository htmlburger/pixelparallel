<template>
  <div :class="imageOuterClasses" :style="{'height': `${imageOuterHeight}px`}">
    <div class="pixelParallel-image-inner" :style="imageInnerStyles" v-draggable="{x: true, y: true, onDragEnd: handleDragEnd}">
      <img class="pixelParallel-image" :style="imageStyles" alt="PixelParallel Image" :src="image.base64string">
    </div><!-- /.pixelParallel-image-inner -->
  </div>
</template>

<script>

import draggableDirective from '../directives/draggable.js';

export default {
  name: 'overlayImage',

  props: ['config', 'image'],

  data () {
    return {
      imageOuterHeight: document.body.clientHeight
    }
  },

  computed: {
    imageOuterClasses () {
      return [
        'pixelParallel-image-outer',
        {
          'pixelParallel-image-no-image': !this.image.base64string,
          'pixelParallel-image-difference': this.config.image.difference,
          'pixelParallel-image-locked': this.config.image.lock,
          'pixelParallel-image-enabled': this.config.image.enabled
        }
      ];
    },
    imageInnerStyles () {
      return {
        'margin-left': `${this.config.image.left}px`,
        'margin-top': `${this.config.image.top}px`
      };
    },
    imageStyles () {
      return {
        'transform': `scale(${this.config.image.scale})`,
        'opacity': this.config.image.opacity
      };
    }
  },
  methods: {
    handleDragEnd (newPosition) {
      this.config.image.top = newPosition.top;
      this.config.image.left = newPosition.left;
    },
    resizeOverlay () {
      this.imageOuterHeight = 0;
      this.imageOuterHeight = document.body.clientHeight;
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeOverlay);

    setInterval(this.resizeOverlay, 500);
  },
  directives: {
    draggable: draggableDirective
  }

}
</script>

<style>
  /*  Overlay - Image  */
  .pixelParallel-image-outer { visibility: hidden; position: absolute; top: 0; left: 0; width: 100%; overflow: hidden; max-width: 100vw; min-height: 100vh; }
  .pixelParallel-image-inner { position: absolute; z-index: 2147483646; left: 50%; top: 0; cursor: move; transform: translateX(-50%); transition: opacity .15s; }
  .pixelParallel-image-inner img { width: auto; height: auto; max-width: none; max-height: none; vertical-align: top; margin: 0; padding: 0; position: relative; transform-origin: 50% 0%; top: -1px; border: 1px dashed #333; }
  .pixelParallel-image-inner img[src=""],
  .pixelParallel-image-inner img:not([src]) { visibility: hidden; }

  /*  States  */
  .pixelParallel-image-enabled { visibility: visible; }
  .pixelParallel-image-difference { mix-blend-mode: difference; }
  .pixelParallel-image-difference img { opacity: 1 !important; }

  .pixelParallel-image-no-image,
  .pixelParallel-image-locked { pointer-events: none; }
  .pixelParallel-image-locked .pixelParallel-image-inner img { top: 0; border: 0 none; }

</style>
