<template>
    <AText
        :id="id"
        :tag="tag"
        class="a-heading"
        :class="tag"
        v-bind="$attrs"
    >
        <slot />
    </AText>
</template>

<script lang="ts">
import Vue from 'vue'
import AText from '@/components/atoms/text/AText.vue'

export default Vue.extend({
    name: 'AHeading',

    components: {
        AText
    },

    inheritAttrs: false,

    props: {
        id: {
            type: String,
            default: null
        },

        level: {
            type: [Number, String],
            validator(value) {
                return [1, 2, 3, 4, 5, 6].includes(Number(value))
            },
            default: 3
        }
    },

    computed: {
        tag(): String {
            return 'h' + this.level
        }
    }
})
</script>

<style lang="scss">
$minWidthXl: 1200px;

.a-heading {
    &.h1 {
        font-size: 2.8rem;
        font-weight: 500;
        text-transform: none;
        line-height: 1.4em;
        letter-spacing: 0.125rem;
    }

    &.h2 {
        font-size: 1.8rem;
    }

    &.h3 {
        font-size: 1.5rem;
    }

    &.h4 {
        font-size: 1.2rem;
    }

    &.h5 {
        font-size: 1rem;
    }

    &.h6 {
        font-size: 0.8rem;
    }

    @media screen and (min-width: $minWidthXl) {
        &.h1 {
            font-size: 3.5rem;
        }

        &.h2 {
            font-size: 2rem;
        }

        &.h3 {
            font-size: 2rem;
        }

        &.h4 {
            font-size: 2rem;
        }

        &.h5 {
            font-size: 2rem;
        }

        &.h6 {
            font-size: 2rem;
        }
    }
}
</style>
