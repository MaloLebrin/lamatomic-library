<template>
    <div class="o-footer">
        <MScrollToTop v-if="!withoutScrollToTop" :styles="styleScrollToTop" />

        <div class="o-footer-cols" :class="computedColsClasses">
            <div class="o-footer-col o-footer-col-1" :class="computedColClasses">
                <slot name="col-1"></slot>
            </div>

            <div class="o-footer-col o-footer-col-2" :class="computedColClasses">
                <slot name="col-2"></slot>
            </div>

            <div class="o-footer-col o-footer-col-3" :class="computedColClasses">
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
        styleScrollToTop: {
            type: String,
            default: 'dark'
        },
        customColsClasses: {
            type: String,
            default: null
        },
        customColClasses: {
            type: String,
            default: null
        }
    },
    computed: {
        computedColsClasses(): String {
            return (this.customColsClasses ? this.customColsClasses : 'default')
        },
        computedColClasses(): String {
            return (this.customColClasses ? this.customColClasses : 'default')
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

    .o-footer-cols {
        &.default {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;


            @media screen and (min-width: 576px) {
                flex-direction: row;
            }
        }

        > .o-footer-col {
            &.default {
                margin: auto;
                text-align: center;
            }
        }
    }

    .a-list {
        flex-wrap: nowrap;
        justify-content: space-around;
    }
}
</style>

