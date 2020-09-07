<template>
  <div class="a-select-image a-select-plus">
    <slot />
    <multiselect v-bind="allBindings" :options="options" :placeholder="placeholder" v-on="$listeners">
        <template slot="singleLabel" slot-scope="{ option }">
        <img class="option__image" :src="option.img" alt="img to select" />
        <span class="option__desc">
            <span class="option__title">{{ option.title }}</span>
        </span>
        </template>

        <template slot="option" slot-scope="{ option }">
        <img class="option__image" :src="option.img" alt="img to select" />
        <span class="option__desc">
            <span class="option__title">{{ option.title }}</span>
            <span class="option__small">{{ option.desc }}</span>
        </span>
        </template>
    </multiselect>
    <slot name="bottom-slot"></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import Multiselect from "vue-multiselect";

export default Vue.extend({
    name: 'ASelectImage',
    components: { Multiselect },
    props: {
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'selectionne ton image'
        }
    },
    computed: {
    allBindings() {
      // Need to proxify both props and attrs, for example for showLabels
      return { ...this.$props, ...this.$attrs };
    }
  }
})
</script>

<style lang="scss">
/* stylelint-disable selector-class-pattern */
.a-select-image {
    .multiselect {
        input {
            display: none;
            width: 100% !important;

        }

        .option__desc,
        .option__image {
            display: inline-block;
            list-style: none;
            vertical-align: middle;
        }

        .multiselect__content {
            display: flex !important;
        }

        .multiselect__option,
        .multiselect__option--highlight {
            display: inline-grid;
        }
    }
}
</style>
