<template>
    <div class="m-card" :class="{ 'is-link': isLink, 'no-anim': noAnim }">
        <ALink
            v-if="isLink"
            :to="to"
            :href="href"
            no-line
        >
            <slot />
        </ALink>

        <div v-else>
            <slot />
        </div>
    </div>
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
    }
})

</script>

<style lang="scss">
$primary: #009cde;
$grey: #333;
$white: #fff;

.m-card {
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
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

        > .link {
            bottom: 0;
            color: $grey;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    &:not(.no-anim) {
        &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
        }
    }
}
</style>
