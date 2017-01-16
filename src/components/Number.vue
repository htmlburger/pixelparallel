<template>
  <label class="number">
    <span class="number-title">{{title}}</span>

    <span class="number-field">
      <span class="number-arrows" v-if="arrows">
        <span class="number-arrow number-arrow-up" @mousedown.prevent="startIncrement($event, step)">+</span>

        <span class="number-arrow number-arrow-down" @mousedown.prevent="startIncrement($event, -step)">-</span>
      </span>

      <input type="number" class="number-input" v-model="inputVal" :step="step" :min="min" :max="max">
    </span>
  </label>
</template>

<script>
export default {
  name: 'toggle',

  props: ['title', 'value', 'arrows', 'step', 'min', 'max'],

  computed: {
    inputVal: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);   
      }
    }
  },

  methods: {
    startIncrement(event, step) {
      const doc = event.target.ownerDocument;
      let newVal = this.inputVal;

      const incrementStopHandler = (event) => {
        if (event.type === 'mouseout' && (event.relatedTarget || event.toElement) && (event.relatedTarget || event.toElement).nodeName !== 'HTML') {
          return;
        }

        if (this.incrementTimeout) {
          clearTimeout(this.incrementTimeout);

          this.incrementTimeout = null;
        }

        if (this.incrementInterval) {
          clearInterval(this.incrementInterval);

          this.incrementInterval = null;
        }

        doc.removeEventListener('mouseup', incrementStopHandler);
        doc.removeEventListener('mouseout', incrementStopHandler);
      };

      const testNewVal = (newVal) => {
        return !((typeof this.min !== 'undefined' && newVal < this.min) || (typeof this.max !== 'undefined' && newVal > this.max));
      }

      const roundVal = (val) => {
        return Math.round(val * 100000) / 100000;
      }

      if (!testNewVal(this.inputVal + step)) {
        return;
      }

      this.inputVal = roundVal(this.inputVal + step);

      this.incrementTimeout = setTimeout(() => {
        this.incrementInterval = setInterval(() => {

          if (testNewVal(this.inputVal + step)) {
            this.inputVal = roundVal(this.inputVal + step);
          }

        }, 80);

      }, 150);

      doc.addEventListener('mouseup', incrementStopHandler);
      doc.addEventListener('mouseout', incrementStopHandler);
    }
  }
}
</script>
