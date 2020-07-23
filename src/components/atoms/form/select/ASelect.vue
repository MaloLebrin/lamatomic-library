<template>
  <div class="a-select">
    <select
      :id="id"
      v-model="localValue"
      class="a-select-input"
      :name="name"
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
    >
      <option disabled value="">{{ emptyValueLabel }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.selected"
        :disabled="disabled ? disabled : option.disabled"
      >{{ option.label }}</option>
    </select>

    <svg class="a-select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.929 284.929">
      <path d="M282.082 76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856-2.471 0-4.661.95-6.563 2.856L142.466 174.441 30.262 62.241c-1.903-1.906-4.093-2.856-6.567-2.856-2.475 0-4.665.95-6.567 2.856L2.856 76.515C.95 78.417 0 80.607 0 83.082c0 2.473.953 4.663 2.856 6.565l133.043 133.046c1.902 1.903 4.093 2.854 6.567 2.854s4.661-.951 6.562-2.854L282.082 89.647c1.902-1.903 2.847-4.093 2.847-6.565 0-2.475-.945-4.665-2.847-6.571z"/>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ASelect',
    model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true,
      // default: (): Array<any> => []
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    emptyValueLabel: {
      type: String,
      default: 'Please select one'
    }
  },
  data () {
    return {
      localValue: this.value
    }
  }
})
</script>

<style lang="scss">
$light-grey: #e1e1e1;
$black: #2b2b2b;

.a-select {
    $arrow-color: $light-grey;
    $background: $light-grey;

    border: 0.1rem solid $light-grey;
    border-radius: 0.3rem;
    display: inline-flex;
    position: relative;

    &.input {
        background: inherit;
        border: 0;
        color: inherit;
        display: block;
        font-size: inherit;
        padding: 0.8rem 1.2rem;
        padding-right: 5rem;
        width: 100%;

        &:focus {
            box-shadow: 0 0 0.6rem rgba($black, 0.4);
        }
    }

    &.arrow {
        bottom: 0;
        fill: $light-grey;
        height: 1.5rem;
        margin: auto;
        position: absolute;
        right: 1rem;
        top: 0;
        width: 1.5rem;
    }
}
</style>
