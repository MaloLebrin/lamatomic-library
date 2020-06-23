<template>
    <component :is="tag" :id="id" :class="tag" class="heading">
        <slot></slot>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AHeading',

    props: {
        id: {
            type: String,
            default: null
        },
        level: {
            type: Number,
            validator(value) {
                return [1, 2, 3, 4, 5, 6].includes(value)
            },
            default: 2,
            required: true
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
.heading {
    &.h1 {
        font-size: 2.8rem;
        font-weight: 500;
        text-transform: none;
        line-height: 1.4em;
        letter-spacing: 0.125rem;
    }

    &.h2 {
        font-size: 1.8rem;
        padding-left: 20px;
    }

    &.h3 {
        font-size: 1.5rem;
        padding-left: 40px;
    }

    &.h4 {
        font-size: 1.2rem;
        padding-left: 60px;
    }

    &.h5 {
        font-size: 1rem;
    }

    &.h6 {
        font-size: 0.8rem;
        font-weight: 900;
    }

    @media screen and (min-width: $minWidthXl) {
        &.h1 {
            font-size: 3.5rem;
        }

        &.h2 {
            font-size: 2rem;
            padding-left: 20px;
        }

        &.h3 {
            font-size: 2rem;
            padding-left: 40px;
        }

        &.h4 {
            font-size: 2rem;
            padding-left: 60px;
        }

        &.h5 {
            font-size: 2rem;
        }

        &.h6 {
            font-size: 2rem;
            font-weight: 900;
        }
    }
}
</style>
