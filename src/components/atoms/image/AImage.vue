<template>
    <img class="a-image" :src="src" :alt="alt" :title="title" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AImage',
    props: {
        src: {
            type: String,
            default: "https://placehold.it/350x150"
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
.a-image {
    animation: 1s appear;
    text-decoration: none;
}
</style>
