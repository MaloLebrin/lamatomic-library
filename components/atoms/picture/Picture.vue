<template>
    <component
        :is="tag"
        class="Picture"
        :src="src"
        :alt="alt"
        :title="computedTitle"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Picture',
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
    },
    computed: {
        computedTitle(): String {
            return 'Image de ' + this.title
        },

        tag(): String {
            return 'img'
        }
    }
})
</script>

<style lang="scss">
.Picture {
    text-decoration: none;
    animation: 1s appear;
}
</style>
