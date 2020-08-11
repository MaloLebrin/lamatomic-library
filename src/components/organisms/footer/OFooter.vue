<template>
    <div class="o-footer">
        <MScrollToTop v-if="!withoutScrollToTop" :styles="stylesScrollToTop" />

        <div class="cols-wrapper">
            <div class="col col-1">
                <slot name="col-1"></slot>
            </div>

            <div class="col col-2">
                <slot name="col-2"></slot>
            </div>

            <div class="col col-3">
                <slot name="col-3"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MScrollToTop from '@/components/molecules/scroll-to-top/MScrollToTop.vue'

export default Vue.extend({
    name: 'MLogo',

    components: {
        MScrollToTop
    },

    props: {
        withoutScrollToTop: {
            type: Boolean,
            default: false
        },
        stylesScrollToTop: {
            type: String,
            default: 'light',
            validator(value) {
                return ['light', 'dark'].includes(value)
            }
        }
    }
})
</script>

<style lang="scss">
$white: #fff;
$black: #2b2b2b;

.o-footer {
    animation: 1s appear;
    background-color: $black;
    color: $white;
    margin: auto;
    padding: 3rem;
    transition: all 100ms;
    width: 100%;

    .m-scroll-to-top {
        display: block;
        margin: auto;
    }

    .cols-wrapper {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;

        > .col {
            margin: auto;
            text-align: center;
        }
    }

    .a-list {
        flex-wrap: nowrap;
        justify-content: space-around;
    }

    @media screen and (min-width: 576px) {
        .cols-wrapper {
            flex-direction: row;
        }
    }
}
</style>
