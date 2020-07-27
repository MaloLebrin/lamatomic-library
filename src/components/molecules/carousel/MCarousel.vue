<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="m-carousel">
        <VueAgile
            v-bind="$attrs"
            :nav-buttons="navButtons"
            :dots="dots"
        >
            <!-- eslint-disable-next-line vue/no-v-html -->
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
$button-color: #fff;
$button-hover: #888;
$dots-color: #eee;
$dots-size: 0.5rem;

.m-carousel {
    .agile {
        &__actions {
            margin-top: 1rem;
        }

        &__nav-button {
            background: transparent;
            border: 0;
            color: rgba($button-color, 0.8);
            cursor: pointer;
            font-size: 2.4rem;
            height: 100%;
            position: absolute;
            text-shadow: 0 2px 3px rgba(#000, 0.25);
            top: 0;
            transition-duration: 0.3s;
            width: 4rem;

            &:hover {
                color: $button-hover;
                text-shadow: 0 2px 5px rgba(#000, 0.25);
            }

            &--prev {
                left: 0;
            }

            &--next {
                right: 0;
            }
        }

        &__dot {
            margin: 0 1rem;

            button {
                background-color: $dots-color;
                border: 0;
                border-radius: 50%;
                cursor: pointer;
                display: block;
                font-size: 0;
                height: $dots-size;
                line-height: 0;
                margin: 0;
                padding: 0;
                transition-duration: 0.3s;
                width: $dots-size;
            }

            &--current,
            &:hover {
                button {
                    background-color: $button-hover;
                }
            }
        }

        // Slides styles
        .slide {
            align-items: center;
            display: flex;
            justify-content: center;
            min-height: 400px;

            .a-image {
                height: 100%;
                object-fit: cover;
                position: absolute;
                width: 100%;
            }

            .caption {
                font-size: 3.2rem;
                font-weight: 300;
            }
        }
    }
}
</style>
