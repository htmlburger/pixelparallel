<template>
  <span class="btn btn-block btn-file">
    {{title}}

    <input type="file" @change="changeHandler">
  </span>
</template>

<script>
import utils from '../utils/utils.js';

export default {
  name: 'upload-button',

  props: ['title', 'onUpload'],

  methods: {
    changeHandler(event) {
      utils.getImageFromInputEvent(event).then((result) => {
        this.onUpload({
          base64string: result.base64string,
          type: result.type
        });
      });
    }
  }
}
</script>
