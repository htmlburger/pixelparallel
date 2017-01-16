<template>
  <div :class="['pixelParallel-rulers', {'pixelParallel-rulers-enabled': config.rulers.enabled}]">
    <div class="pixelParallel-ruler-x" :style="{'margin-top': `${config.rulers.x}px`}" v-draggable="{y: true, onDragEnd: handleXDragEnd}"></div>
    <div class="pixelParallel-ruler-y" :style="{'margin-left': `${config.rulers.y}px`}" v-draggable="{x: true, onDragEnd: handleYDragEnd}"></div>
  </div><!-- /.pixelParallel-rulers -->
</template>

<script>

import draggableDirective from './../directives/draggable.js';

export default {
  name: 'overlay-rulers',

  props: ['config'],

  methods: {
    handleXDragEnd (newPosition) {
      this.config.rulers.x = newPosition.top;
    },
    handleYDragEnd (newPosition) {
      this.config.rulers.y = newPosition.left;
    }
  },
  directives: {
    draggable: draggableDirective
  }
}
</script>

<style>
  /*  Overlay - Rulers  */
  .pixelParallel-rulers { position: relative; z-index: 2147483646; }
  .pixelParallel-ruler-x,
  .pixelParallel-ruler-y { display: none; position: fixed; top: 0; left: 0; z-index: 2; background: cyan; }
  .pixelParallel-ruler-x:after,
  .pixelParallel-ruler-y:after { content: ''; position: absolute; top: -8px; left: -8px; right: 0; bottom: 0; padding: 10px; }

  .pixelParallel-ruler-x { right: 0; height: 1px; cursor: row-resize; }
  .pixelParallel-ruler-y { bottom: 0; width: 1px; cursor: col-resize; }

  /*  States  */
  .pixelParallel-rulers-enabled .pixelParallel-ruler-x,
  .pixelParallel-rulers-enabled .pixelParallel-ruler-y { display: block; }
</style>
