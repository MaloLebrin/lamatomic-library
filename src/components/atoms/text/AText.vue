<template>
    <component
        :is="computedTag"
        class="a-text"
        :class="[align, weight, decoration, { italic }]"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AText',
    props: {
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
        },

        span: {
            type: Boolean,
            default: false
        },

        tag: {
            type: String,
            default: null
        }
    },

    computed: {
        computedTag(): String {
            if (this.tag) return this.tag

            if (this.span) return 'span'

            return 'p'
        }
    }
})
</script>

<style lang="scss">
.a-text {
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
}
</style>
