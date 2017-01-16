<template>
  <label :class="['toggle', {'toggle-checked': checked}]">
    <span class="toggle-title">{{title}} <a href="#" v-if="action" @click.prevent="action.handler">{{action.text}}</a></span>

    <input type="checkbox" class="toggle-checkbox" v-model="checked">

    <span class="toggle-main">
      <span class="toggle-handle"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'toggle',

  props: ['title', 'action', 'value'],

  computed: {
    checked: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);   
      }
    }
  }
}
</script>
