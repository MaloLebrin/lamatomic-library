<template>
    <video
        class="a-video"
        :src="src"
        :alt="alt"
        :title="title"
        :type="type"
        :autoplay="autoplay"
        :controls="controls"
        :loop="loop"
        :muted="muted"
        :preload="preload"
        :poster="poster"

        >
        <slot />
    </video>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AVideo',

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
        },

        autoplay: {
            type: Boolean,
            default: false
        },

        controls: {
            type: Boolean,
            default: true
        },

        loop: {
            type: Boolean,
            default: false
        },

        muted: {
            type: Boolean,
            default: false
        },

        preload: {
            type: String,
            default:'none',
            validator(value) {
                return ['none', 'metadata', 'auto'].includes(value)
            }
        },

        poster: {
            type: String,
            default: null
        }
    }
})
</script>

<style lang="scss">
.a-video {
    animation: 1s appear;
    text-decoration: none;
}
</style>
