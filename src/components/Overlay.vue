<template>
  <div :class="['pixelParallel-overlay', {'pixelParallel-overlay-enabled': config.visible}]" >
    <overlayGrids :config="config" />

    <overlayImage :config="config" :image="image" />

    <overlayRulers :config="config" />
  </div><!-- /.pixelParallel-overlay -->

</template>

<script>
import OverlayImage from './OverlayImage.vue';
import OverlayGrids from './OverlayGrids.vue';
import OverlayRulers from './OverlayRulers.vue';

export default {
  name: 'overlay',

  props: ['config', 'image'],

  components: {
    OverlayImage,
    OverlayGrids,
    OverlayRulers
  }
}
</script>

<style>
  /*  Overlay  */
  .pixelParallel-overlay { position: absolute; left: 0; top: 0; width: 100%; text-align: center; white-space: nowrap; display: none; }
  .pixelParallel-overlay-enabled { display: block; }
</style>
