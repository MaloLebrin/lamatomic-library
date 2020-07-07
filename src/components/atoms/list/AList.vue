<template>
    <component
        :is="type"
        class="list"
        :class="{
            'without-chips': withoutChips,
            horizontal: horizontal
        }"
    >
        <li v-for="item in items" :key="item">{{ item }}</li>
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

    &:not(.without-chips) {
        list-style: none;
    }

    &.horizontal {
        display: flex;
        flex-wrap: wrap;

        > li {
            margin: 2rem;

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
