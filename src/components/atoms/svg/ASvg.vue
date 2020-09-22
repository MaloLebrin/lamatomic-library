<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="a-svg"
        :width="width"
        :height="height"
        :viewBox="getViewBox"
        :aria-labelledby="iconName"
        role="presentation"
    >
        <title
            :id="iconName"
            lang="en"
        >
            {{ iconName }} icon
        </title>

        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ASvg',

    props: {
        iconName: {
            type: String,
            default: 'lama'
        },

        width: {
            type: [Number, String],
            default: 18
        },

        height: {
            type: [Number, String],
            default: 18
        },

        iconColor: {
            type: String,
            default: 'currentColor'
        },

        sizeX: {
            type: Number,
            default: 512
        },

        sizeY: {
            type: Number,
            default: 512
        }
    },

    computed: {
        getViewBox(): String {
            return "0 0 " + this.sizeX + " " + this.sizeY
        }
    }
})
</script>

<style lang="scss">
.a-svg {
    animation: 1s appear;
    height: 100%;
    text-decoration: none;
    width: 100%;
}
</style>
