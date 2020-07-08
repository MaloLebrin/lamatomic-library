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
$primary: #009CDE;
$grey: #333;
$white: #fff;

.m-card {
    position: relative;
    top: 0px;
    bottom: 0px;
    color: $grey;
    text-decoration: none;
    display: block;
    width: 100%;
    padding: 2rem;
    margin: 0 auto 2rem auto;
    background-color: $white;
    text-align: center;
    line-height: 3rem;

    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25);

    transition: all .1s ease-in-out;

    &.is-link {
        &:hover {
            cursor: pointer;

            & a {
                color: $primary;
            }
        }

        > .link {
            color: $grey;
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
        }
    }

    &:not(.no-anim) {
        &:hover {
            box-shadow: 0 5px 10px rgba(0,0,0,0.25);
        }
    }
}
</style>
