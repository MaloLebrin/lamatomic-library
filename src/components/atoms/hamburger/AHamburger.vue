<template>
    <AButton
        class="a-hamburger"
        :class="{'a-hamburger--is-open': isOpen}"
        @click="$emit('click')"
    >
        <span class="a-hamburger-bar"></span>
        <AText align="left"> {{ getMenuText }} </AText>
    </AButton>
</template>

<script lang="ts">
import Vue from 'vue'
import AButton from '@/components/atoms/button/AButton.vue'
import AText from '@/components/atoms/text/AText.vue'

export default Vue.extend({
    name: 'AHamburger',

    components: {
        AButton,
        AText,
    },

    props: {
        isOpen: {
        type: Boolean,
        default: false
        }
    },

    computed: {
        getMenuText(): String {
            if (this.isOpen) return 'Fermer le menu'

            return 'Menu'
        }
    }

})
</script>

<style lang="scss">
.a-hamburger {
    $hamburger-color: #000;
    $hamburger-background-color: transparent;
    $hamburger-width: 1.2rem;
    $hamburger-height: 1.3rem;
    $hamburger-bar-thickness: 0.2rem;
    $hamburger-bar-space: 0.15rem;
    $hamburger-bar-border-radius: 0.15rem;
    $hamburger-pad: 0;
    $hamburger-transition-duration: 0.3s;
    $this: &;

    border: 0;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;
    display: block;
    height: $hamburger-height;
    margin: 0;
    padding: 0;
    position: relative;
    transition: background $hamburger-transition-duration;
    width: $hamburger-width;

    &.a-button {
        background-color: $hamburger-background-color;

        .a-text {
            color: $hamburger-color;
            display: block;
            font-size: 1.2rem;
            margin: 0;
            position: absolute;
            top: calc(#{$hamburger-height} * (0.01));
            left: calc(#{$hamburger-width} + 1rem);
        }
    }


    &:hover {
        background-color: $hamburger-background-color;
    }

    &:focus {
        outline: none;
    }

    &-bar {
        background: $hamburger-color;
        display: block;
        height: $hamburger-bar-thickness;
        left: $hamburger-pad;
        position: absolute;
        right: $hamburger-pad;
        top: ($hamburger-height / 2) - ($hamburger-bar-thickness / 2);
        transition: background 0s $hamburger-transition-duration;

        &,
        &::after,
        &::before {
            border-radius: $hamburger-bar-border-radius;
        }

        &::after,
        &::before {
            background: $hamburger-color;
            content: '';
            display: block;
            height: $hamburger-bar-thickness;
            left: 0;
            position: absolute;
            width: 100%;
        }

        &::before {
            top: -$hamburger-bar-thickness - $hamburger-bar-space;
            transition: top $hamburger-transition-duration $hamburger-transition-duration,
                transform $hamburger-transition-duration 0s,
                background $hamburger-transition-duration 0s;
        }

        &::after {
            bottom: -$hamburger-bar-thickness - $hamburger-bar-space;
            transition: bottom $hamburger-transition-duration $hamburger-transition-duration,
                transform $hamburger-transition-duration 0s,
                background $hamburger-transition-duration 0s;
        }
    }

    &--is-open {
        &.a-button {
            .a-text {
                width: 10rem;
            }
        }

        #{$this}-bar {
            background: none;

            &::before,
            &::after {
                background-color: $hamburger-color;
            }

            &::before {
                top: 0;
                transform: rotate(45deg);
                transition: top $hamburger-transition-duration 0s,
                    transform $hamburger-transition-duration $hamburger-transition-duration,
                    background $hamburger-transition-duration 0s;
            }

            &::after {
                bottom: 0;
                transform: rotate(-45deg);
                transition: bottom $hamburger-transition-duration 0s,
                    transform $hamburger-transition-duration $hamburger-transition-duration,
                    background $hamburger-transition-duration 0s;
            }
        }
    }
}
</style>
