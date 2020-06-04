<template>
    <component :is="type" :class="{ list: 1, decoration: decoration }">
        <li v-for="item in items" :key="item">{{ item }}</li>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'List',
    props: {
        type: {
            type: String,
            default: 'ul'
        },
        items: {
            type: Array,
            default: () => []
        },
        decoration: {
            type: Boolean,
            default: true
        }
    }
})
</script>

<style lang="scss">
.list {
    padding-left: 2rem;

    &:not(.decoration) {
        list-style: none;
    }
}
</style>
