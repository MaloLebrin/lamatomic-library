<template>
    <component
        :is="type"
        class="a-list"
        :class="{
            'without-chips': withoutChips,
            'no-padding': noPadding,
            horizontal: horizontal
        }"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AList',
    props: {
        type: {
            type: String,
            default: 'ul'
        },

        withoutChips: {
            type: Boolean,
            default: false
        },

        noPadding: {
            type: Boolean,
            default: false
        },

        horizontal: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="scss">
.a-list {
    padding-left: 2rem;

    &.no-padding {
        padding-left: 0;
    }

    &.without-chips {
        list-style: none;
    }

    &.horizontal {
        align-items: center;
        display: flex;
        flex-wrap: wrap;

        > .a-list-item {
            margin: 0.5rem;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
