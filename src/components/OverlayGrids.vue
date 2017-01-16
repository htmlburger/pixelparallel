<template>
  <div class="pixelParallel-grids">
    <div :class="['pixelParallel-grid-horizontal', {'pixelParallel-grid-horizontal-enabled': config.horizontalGrid.enabled}]" :style="horizontalGridStyles">
      <span v-for="val in config.horizontalGrid.columns" />
    </div>

    <div :class="['pixelParallel-grid-vertical', {'pixelParallel-grid-vertical-enabled': config.verticalGrid.enabled}]" :style="verticalGridStyles"></div>
  </div><!-- /.pixelParallel-grids -->
</template>

<script>

export default {
  name: 'overlay-grids',

  props: ['config'],

  computed: {
    horizontalGridStyles () {
      return {
        'opacity': this.config.horizontalGrid.opacity,
        'border-spacing': `${this.config.horizontalGrid.gutter}px`,
        'width': `${this.config.horizontalGrid.width ? `${this.config.horizontalGrid.width + this.config.horizontalGrid.gutter * 2}px` : `calc(100% + ${this.config.horizontalGrid.gutter * 2}px)`}`
      };
    },
    verticalGridStyles() {
      return {
        'opacity': this.config.verticalGrid.opacity,
        'background-size': `100% ${this.config.verticalGrid.gutter}px`
      }
    }
  }
}
</script>

<style>
  /*  Overlay - Grids  */
  .pixelParallel-grids { position: relative; z-index: 2147483646; pointer-events: none; }
  .pixelParallel-grid-horizontal,
  .pixelParallel-grid-vertical { position: fixed; z-index: 1; pointer-events: none; visibility: hidden; }

  .pixelParallel-grid-horizontal { top: 50%; left: 50%; display: table; width: 100vw; height: 200vh; opacity: .5; table-layout: fixed; border-spacing: 30px; transform: translate(-50%, -50%); }
  .pixelParallel-grid-horizontal span { display: table-cell; background: red; height: 200vh; }

  .pixelParallel-grid-vertical { top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, transparent 90%, blue 90%, blue); background-size: 100% 10px; opacity: .5; }

  /*  States  */
  .pixelParallel-grid-horizontal-enabled { visibility: visible; }
  .pixelParallel-grid-vertical-enabled { visibility: visible; }
</style>
