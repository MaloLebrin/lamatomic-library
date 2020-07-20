<template>
    <div class="o-footer">
        <MScrollToTop v-if="withScrollToTop"/>

        <div class="cols-wrapper">
            <!-- in <OFooter> : <template #colonne1>content colonne1 here</template> -->
            <slot name="colonne1"></slot>

            <slot name="colonne2"></slot>

            <slot name="colonne3"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MScrollToTop from '../../molecules/scroll-to-top/MScrollToTop.vue'

export default Vue.extend({
    name: 'MLogo',
    components: {
        MScrollToTop
    },

    props: {
        withScrollToTop: {
            type: Boolean,
            default: true
        }
    }
})
</script>

<style lang="scss">
$white: #fff;
$black: #2B2B2B;
.o-footer {
    margin: auto;
    padding: 3rem;
    animation: 1s appear;
    background-color: $black;
    width: 100%;
    color: $white;

    .m-scroll-to-top {
        display: block;
        margin: auto;
    }

    .cols-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;

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

@media screen and (min-width: 640px) {
  .o-footer {
    .cols-wrapper {
        flex-direction: row;
    }
  }
}
</style>
