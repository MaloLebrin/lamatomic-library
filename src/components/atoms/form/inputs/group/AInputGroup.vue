<template>
    <div class="a-input-group">
        <div v-if="hasSlotPrepend" class="prepend">
           <slot name="prepend" />
        </div>

        <slot />

        <div v-if="hasSlotAppend" class="append">
            <slot name="append" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputGroup',

    computed: {
        hasSlotPrepend(this: any) {
            return !!this.$slots.prepend && !!this.$slots.prepend[0]
        },

        hasSlotAppend(this: any) {
            return !!this.$slots.append && !!this.$slots.append[0]
        },
    }
})
</script>

<style lang="scss">
.a-input-group {
    display: inline-block;
    position: relative;

    .prepend,
    .append {
        margin: auto;
        padding: 6px;
        position: absolute;
    }

    .append {
        right: 0;
        top: 0;
    }

    .a-input {
        padding: 0 1.5rem;
    }
}
</style>

