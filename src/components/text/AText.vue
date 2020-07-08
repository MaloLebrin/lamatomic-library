<template>
    <component
        :is="tag"
        class="atom-text"
        :class="{
            left: align === 'left',
            center: align === 'center',
            right: align === 'right',
            justify: align === 'justify'
        }"
    >
        <!-- @slot Main slot used for text -->
        <slot></slot>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AText',
    props: {
        align: {
            type: String,
            default: 'left',
            required: false,
            validator(value) {
                return ['left', 'right', 'center', 'justify'].includes(value)
            }
        },
        span: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tag(): String {
            if (this.span) return 'span'
            return 'p'
        }
    }
})
</script>

<style lang="scss">
.atom-text {
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
}
</style>
