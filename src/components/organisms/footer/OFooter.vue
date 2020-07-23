<template>
    <div class="o-footer">
        <MScrollToTop v-if="!withoutScrollToTop"/>

        <div class="cols-wrapper">
            <slot name="col-1"></slot>

            <slot name="col-2"></slot>

            <slot name="col-3"></slot>
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

        > * {
            margin: auto;
            text-align: center;
        }
    }

    .list {
        flex-wrap: nowrap;
        justify-content: space-around;
    }
}

@media screen and (min-width: 576px) {
    .o-footer {
        .cols-wrapper {
            flex-direction: row;
        }
    }
}
</style>
