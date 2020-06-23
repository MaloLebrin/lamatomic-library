<template>
    <img class="image" :src="src" :alt="alt" :title="title" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AImage',
    props: {
        src: {
            type: String,
            default: null
        },
        alt: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    }
})
</script>

<style lang="scss">
.image {
    text-decoration: none;
    animation: 1s appear;
}
</style>
