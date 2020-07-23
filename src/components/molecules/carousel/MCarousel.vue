<template>
    <Carousel
        class="m-carousel"
        :per-page="perPage"
        :navigation-enabled="navigationEnabled"
        :navigation-prev-label="navigationPrevLabel"
        :navigation-next-label="navigationNextLabel"
        :auto-play="autoPlay"
        :loop="loop"
    >
        <Slide v-for="slide in slides" :key="slide" class=slide v-html="slide"></Slide>
    </Carousel>
</template>

<script lang="ts">

import Vue from 'vue'
import { Carousel, Slide } from 'vue-carousel'

export default Vue.extend({
    name: 'Mcarousel',
    components: {
        Carousel,
        Slide,
    },
    props: {
        slides: {
            type: Array,
            default: (): Array<any> => []
        },
        navigationEnabled: {
            type: Boolean,
            default: false
        },
        mouseDrag: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        autoplayTimeout:{
            type: Number,
            default: 2000
        },
        loop: {
            type: Boolean,
            default: false
        },
        speed: {
            type: Number,
            default: 500
        },
        perPage: {
            type: Number,
            default:1
        },
        paginationColor: {
            type: String,
            default: '#009CDE'
        },
        navigationNextLabel: {
            type: String,
            default: '>'
        },
        navigationPrevLabel: {
            type: String,
            default: '<'
        },
        autoplayHoverPause: {
            type: Boolean,
            default: true
        },
        centerMode: {
            type: Boolean,
            default: true
        }
    }
})
</script>

<style lang="scss">
$primary: #009cde;

.m-carousel.VueCarousel {
    .VueCarousel-slide {
        > * {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    .VueCarousel-pagination {
        position: absolute;
        bottom: -70px;
    }
}
</style>
