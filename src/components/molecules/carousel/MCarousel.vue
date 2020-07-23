<template>
    <Carousel
        class="m-carousel"
        v-bind="$attrs"
        :per-page="perPage"
    >
        <Slide v-for="slide in slides" :key="slide" class="slide" v-html="slide"></Slide>
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

    inheritAttrs: false,

    props: {
        slides: {
            type: Array,
            default: (): Array<any> => []
        },

        perPage: {
            type: Number,
            default: 1
        },

        paginationColor: {
            type: String,
            default: '#009CDE'
        }
    }
})
</script>

<style lang="scss">
/* stylelint-disable selector-class-pattern */
.m-carousel.VueCarousel {
    .VueCarousel-slide {
        > * {
            height: 100%;
            object-fit: cover;
            width: 100%;
        }
    }

    .VueCarousel-pagination {
        bottom: -70px;
        position: absolute;
    }
}
</style>
