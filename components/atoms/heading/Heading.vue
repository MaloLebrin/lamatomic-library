<template>
    <component
        :is="tag"
        :id="id"
        :level="computedLevel"
        :class="{
            heading: 1
        }"
        :type="type"
    >
        <slot></slot>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Heading',
    props: {
        level: {
            type: Number,
            validator(value) {
                return [1, 2, 3, 4, 5, 6].includes(value)
            },
            default: 2,
            required: true
        },
        id: {
            type: String,
            default: 'title'
        },
        type: {
            type: String,
            default: null
        }
    },
    computed: {
        tag() {
            return 'h' + this.level
        },
        computedLevel(): Number {
            // eslint-disable-next-line prefer-const
            let level = this.level
            if (level > 6) {
                return 2
            } else {
                return level
            }
        }
    }
})
</script>

<style lang="scss">
heading,
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
    }
    @media screen and (min-width: $minWidthXl) {
        h1,
        .h1 {
            font-size: 3.5rem;
        }
        h2,
        .h2 {
            font-size: 2rem;
        }
    }
}
</style>
