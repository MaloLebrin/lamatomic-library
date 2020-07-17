<template>
    <AButton
        class="m-scroll-to-top"
        :styles='styles'
        :title='title'
        @click="scrollToTop"
    >
        ^
    </AButton>
</template>

<script lang="ts">
import Vue from 'vue'
import AButton from '../../atoms/button/AButton.vue'

// inspiration function : https://github.com/vue-multiple/back-top
export const scrollTop = (el: any, from = 0, to: number, duration = 500) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }

    const difference = Math.abs(from - to)
    const scale = 1 / (1 - Math.pow(10 / difference, 1 / (60 * duration / 1000 - 10)))

    function scrollEase(start: any, end: any) {
        if (start === end) return
        const stepNum = Math.ceil(Math.abs(start - end) / scale)

        let d = Math.min(end, start + stepNum)

        if (start > end) {
            d = Math.max(end, start - stepNum)
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }

        window.requestAnimationFrame(() => scrollEase(d, end))
    }

    scrollEase(from, to)
}

export default Vue.extend({
    name: 'MScrollToTop',
    components: {
        AButton
    },
    props: {
        title: {
            type: String,
            default: 'Revenir en haut de la page'
        },
        duration: {
            type: Number,
            default: 1000
        },
        // dark or light
        styles: {
            type: String,
            default: 'light',
            validator(value) {
                return ['light', 'dark'].includes(value)
            }
        }
    },
    methods: {
        scrollToTop() {
            const sTop = document.documentElement.scrollTop || document.body.scrollTop
            scrollTop(window, sTop, 0, this.duration)
            this.$emit('click')
        }
    }
})

</script>

<style lang="scss">
$primary: #009CDE;
$grey: #333;
$white: #fff;

.m-scroll-to-top{
    &.button {
        text-align: center;
        font-size: 2rem;
        padding: 1rem;
        padding-bottom: 0;
        padding-top: 0.5rem;
    }
}
</style>
