<template>
  <span class="paste-box mousetrap" :title="title" contenteditable="true" @paste="pasteHandler">
  </span>
</template>

<script>
import utils from '../utils/utils.js';

export default {
  name: 'upload-button',

  props: ['title', 'onPaste'],

  methods: {
    pasteHandler(event) {
      utils.getImageFromPasteEvent(event).then((result) => {
        this.onPaste({
          base64string: result.base64string,
          type: result.type
        });
      });
    }
  }
}
</script>
