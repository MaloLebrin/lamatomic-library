<template>
    <div class="a-input-group">
        <div v-if="hasSlotPreprend" class="preprend">
           <slot name="preprend" />
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

    props: {
        id: {
            type: String,
            default: null,
        },
    },

    computed: {
        hasSlotPreprend(this: any) {
            return !!this.$slots.preprend && !!this.$slots.preprend[0]
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

    .preprend {
        margin: auto;
        padding: 6px;
        position: absolute;

    }

    .append {
        margin: auto;
        padding: 6px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .a-input {
        padding: 0 1.5rem;
    }
}
</style>

