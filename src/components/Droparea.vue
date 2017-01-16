<template>
  <div :class="['droparea', {'enabled': enabled}]">
    <span class="droparea-title">{{title}}</span>
    <input type="file" @change="changeHandler">
  </div>
</template>

<script>
import utils from '../utils/utils.js';

export default {
  name: 'droparea',

  props: ['title', 'onUpload'],

  data() {
    return {
      enabled: false,
      parentDoc: document,
      isolatorDoc: null
    }
  },

  mounted() {
    this.parentDoc.addEventListener('dragenter', ( event ) => {
      this.attemptEnable(event);
    }, false);

    this.parentDoc.addEventListener('dragleave', ( event ) => {
      this.enabled = false;
    }, false);
  },

  methods: {
    changeHandler(event) {
      utils.getImageFromInputEvent(event).then((result) => {
        this.onUpload({
          base64string: result.base64string,
          type: result.type
        });
      });
    },
    setIsolatorDoc(doc) {
      this.isolatorDoc = doc;
      this.bindIsolatorDoc()
    },
    attemptEnable(event) {
      if ('dataTransfer' in event && 'items' in event.dataTransfer && event.dataTransfer.items.length === 1 && (event.dataTransfer.items[0].type === 'image/png' || event.dataTransfer.items[0].type === 'image/jpeg')) {
        this.enabled = true;
      }
    },
    bindIsolatorDoc() {

      this.isolatorDoc.addEventListener('dragenter', ( event ) => {
        this.attemptEnable(event);
      }, false);

      this.isolatorDoc.addEventListener('dragover', ( event ) => {
          event.preventDefault();
          this.attemptEnable(event);
      }, false);


      this.isolatorDoc.addEventListener('drop', ( event ) => {
          this.enabled = false;
        
      }, false);

    }
  }
}
</script>
