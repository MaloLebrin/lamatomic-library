<template>
  <label
    :for="htmlFor"
    class="label"
  >
    <template v-if="required">*</template><slot></slot>
  </label>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'ALabel',
  props: {
    htmlFor: {
        type: String,
        default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
$red: #d92550;
$green: #3ac47d;
.label {
  font-size: inherit;
  user-select: none;
  display: flex;
  align-items: center;

  &.error {
    color: $red;
  }

  &.success {
    color: $green;
  }
}
</style>
