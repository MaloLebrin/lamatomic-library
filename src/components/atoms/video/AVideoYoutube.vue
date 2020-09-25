<template>
    <iframe
        :width="width"
        :height="height"
        :src="src"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AVideoYoutube',

    props: {
        src: {
            type: String,
            default: 'https://www.youtube.com/embed/DkXhSAW5pTQ'
        },

        height: {
            type: String,
            default: '315'
        },

        width: {
            type: String,
            default: '640'
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
            default:'auto',
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
