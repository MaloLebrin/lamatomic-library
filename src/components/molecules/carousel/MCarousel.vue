<template>
    <Carousel :per-page="1" :mouse-drag="false">
        <Slide v-for="slide in slides" :key="slide" v-html="slide">
        </Slide>
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
        autoPlay:{
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        },
        speed: {
            type: Number,
            default:500
        },
        perPage: {
            type: Number,
            default:2
        }
    }
})

</script>