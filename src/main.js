import Vue from 'vue';
import PixelParallel from './PixelParallel.vue';

var pixelParallelContainer = document.querySelector('#pixel-parallel-container');

if (document.querySelector('#pixel-parallel-container') === null) {

  pixelParallelContainer = document.createElement('div');
  pixelParallelContainer.id = 'pixel-parallel-container';

  document.body.appendChild(pixelParallelContainer);

  new Vue({
    el: pixelParallelContainer,
    render: h => h(PixelParallel)
  });
}
