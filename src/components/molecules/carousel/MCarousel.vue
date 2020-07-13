<template>
    <carousel :per-page="1" :mouse-drag="false">
        <slide>
            <slot></slot>
        </slide>
        <slide>
            <AImage/>
        </slide>
  </carousel>
</template>

<script lang="ts">

import Vue from 'vue'
import { Carousel, Slide } from 'vue-carousel'
import AImage from '@/components/atoms/image/AImage.vue'

export default Vue.extend({
    name: 'Mcarousel',
    components: {
        Carousel,
        Slide,
        AImage
    },
    props: {
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