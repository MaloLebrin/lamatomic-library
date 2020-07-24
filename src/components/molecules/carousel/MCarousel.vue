<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="m-carousel" :class="{'yeah': navButtons}">
        <VueAgile
            v-bind="$attrs"
            :nav-buttons="navButtons"
            :dots="dots"
        >
            <div v-for="slide in slides" :key="slide" class="slide" v-html="slide"></div>

            <template slot="prevButton">
                <span title="Précédent">&lt;</span>
            </template>

            <template slot="nextButton">
                <span title="Suivant">&gt;</span>
            </template>
        </VueAgile>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VueAgile } from 'vue-agile'

export default Vue.extend({
    name: 'MCarousel',

    components: {
        VueAgile
    },

    inheritAttrs: false,

    props: {
        slides: {
            type: Array,
            default: (): Array<any> => []
        },

        navButtons: {
            type: Boolean,
            default: false
        },

        dots: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="scss">
.m-carousel {
    .agile {
        &__actions {
            margin-top: 1rem;
        }

        &__nav-button {
            background: transparent;
            border: 0;
            color: rgba(#fff, 0.8);
            cursor: pointer;
            font-size: 24px;
            height: 100%;
            position: absolute;
            top: 0;
            transition-duration: 0.3s;
            width: 40px;

            &:hover {
                color: #888;
            }

            &--prev {
                left: 0;
            }

            &--next {
                right: 0;
            }
        }

        &__dot {
            margin: 0 10px;

            button {
                background-color: #eee;
                border: 0;
                border-radius: 50%;
                cursor: pointer;
                display: block;
                font-size: 0;
                height: 10px;
                line-height: 0;
                margin: 0;
                padding: 0;
                transition-duration: 0.3s;
                width: 10px;
            }

            &--current,
            &:hover {
                button {
                    background-color: #888;
                }
            }
        }

        // Slides styles
        .slide {
            align-items: center;
            display: flex;
            justify-content: center;

            .image {
                height: 100%;
                object-fit: cover;
                width: 100%;
            }

            h3 {
                font-size: 3.2rem;
                font-weight: 300;
            }
        }
    }
}
</style>
