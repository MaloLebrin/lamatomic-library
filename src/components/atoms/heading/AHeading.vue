<template>
    <component
        :is="tag"
        :id="id"
        :class="[tag, align, weight, decoration, {italic}]"
        class="a-heading"
    >
        <slot />
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
            type: [Number, String],
            validator(value) {
                return [1, 2, 3, 4, 5, 6].includes(Number(value))
            },
            default: 1
        },
        align: {
            type: String,
            default: null,
            validator(value) {
                return ['left', 'right', 'center', 'justify'].includes(value)
            }
        },

        weight: {
            type: String,
            default: null,
            validator(value) {
                return ['thin', 'normal', 'bold', 'bolder'].includes(value)
            }
        },

        decoration: {
            type: String,
            default: null,
            validator(value) {
                return ['no-decoration', 'blink', 'dashed', 'dotted', 'double', 'underline'].includes(value)
            }
        },

        italic: {
            type: Boolean,
            default: false
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

    // Align
    &.left {
        text-align: left;
    }

    &.center {
        text-align: center;
    }

    &.right {
        text-align: right;
    }

    &.justify {
        text-align: justify;
    }

    // Style
    &.no-style {
        font-style: none !important;
    }

    &.italic {
        font-style: italic;
    }

    // Weight
    &.thin {
        font-weight: 100;
    }

    &.normal {
        font-weight: 300;
    }

    &.bold {
        font-weight: 600;
    }

    &.bolder {
        font-weight: 900;
    }

    // Decoration
    &.no-decoration {
        text-decoration: none !important;
    }

    &.blink {
        text-decoration: blink;
    }

    &.dashed {
        text-decoration: dashed;
    }

    &.dotted {
        text-decoration: dotted;
    }

    &.double {
        text-decoration: double;
    }

    &.underline {
        text-decoration: underline;
    }

    // Transform
    &.no-transform {
        text-transform: none !important;
    }

    &.capitalize {
        text-transform: capitalize;
    }

    &.lowercase {
        text-transform: lowercase;
    }

    &.uppercase {
        text-transform: uppercase;
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
