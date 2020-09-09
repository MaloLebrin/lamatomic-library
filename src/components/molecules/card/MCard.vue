<template>
    <component
    :is="tag" class="m-card"
    :class="{ 'is-link': isLink, 'no-anim': noAnim }"
    :to="to"
    :href="href"
    :no-line="isLink">
        <slot />
    </component>
</template>

<script lang="ts">
import Vue from 'vue'
import ALink from '../../atoms/link/ALink.vue'

export default Vue.extend({
    name: 'MCard',

    components: {
        ALink
    },

    props: {
        /** "to" prop for vue-router - renders a <a> */
        href: {
            type: String,
            default: null
        },
        to: {
            type: String,
            default: null
        },
        isLink: {
            type: Boolean,
            default: false
        },
        noAnim: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        tag(): String {
            if (this.isLink) return 'ALink'

            return 'div'
        }
    }
})

</script>

<style lang="scss">
$primary: #009cde;
$grey: #333;
$white: #fff;

.m-card {
    background-color: $white;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    display: block;
    margin-bottom: 2rem;
    overflow: hidden;
    padding: 2rem;
    transition: all 0.3s ease-in-out;

    &.is-link {
        &:hover {
            cursor: pointer;

            a {
                color: $primary;
            }
        }
    }

    &:not(.no-anim) {
        &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
        }
    }
}
</style>
