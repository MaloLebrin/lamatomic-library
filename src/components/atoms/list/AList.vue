<template>
    <component
        :is="type"
        class="list"
        :class="{
            'without-chips': withoutChips,
            'no-padding': noPadding,
            horizontal: horizontal
        }"
    >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <li v-for="item in items" :key="item" class="list-item" v-html="item"></li>
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

        items: {
            type: Array,
            default: (): Array<any> => []
        },

        withoutChips: {
            type: Boolean,
            default: true
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
.list {
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

        > .list-item {
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
