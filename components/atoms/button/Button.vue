<template>
    <component
        :is="tag"
        :id="id"
        :class="{
            button: 1,
            disabled: disabled,
            success: computedSuccess,
            warning: computedWarning,
            error: computedError,
            white: computedWhite,
            black: computedBlack
        }"
        :href="href"
        :to="to"
        :target="computedTarget"
        :title="computedTitle"
        :state="state"
        :styles="styles"
        :type="type"
        :disabled="disabled"
        @click="handleClick"
    >
        <!-- @slot Main slot used for text -->
        <slot></slot>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Button',
    props: {
        /** ID attribute */
        id: {
            type: String,
            default: null
        },
        /** "href" for link - renders an <a> component */
        href: {
            type: String,
            default: null
        },
        /** Type attribute for button - ie type="submit" */
        type: {
            type: String,
            validator(value) {
                return ['button', 'reset', 'submit', null].includes(value)
            },
            default: null,
            required: false
        },
        /** "to" prop for vue-router - renders a <nuxt-link> */
        to: {
            type: [Object, String],
            default: null
        },
        /** target attribute for the <a> tag: _blank, _self, _top */
        target: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        /** state: success, warning, error or null */
        state: {
            type: String,
            validator(value) {
                return ['success', 'warning', 'error', 'default'].includes(
                    value
                )
            },
            default: 'default',
            required: false
        },
        /** style: default, black or white */
        styles: {
            type: String,
            validator(value) {
                return ['white', 'black', 'default'].includes(value)
            },
            default: 'default',
            required: false
        },
        /** Disabled mode */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedTarget(): String | null {
            if (this.to) {
                return null
            }

            return this.target || (this.href ? '_blank' : null)
        },

        computedTitle(): String | null {
            let title = this.title

            if (this.href) {
                title = "Se rendre à l'adresse " + this.href
            }

            if (this.to) {
                title = 'Se rendre à la page ' + this.to
            }

            if (this.type === 'submit') {
                title = 'Validate formulaire'
            }

            return title
        },

        tag() {
            if (this.href) return 'a'
            if (this.to) return 'nuxt-link'
            return 'button'
        },

        computedSuccess() {
            if (this.state === 'success') {
                return true
            }
            return false
        },

        computedWarning() {
            if (this.state === 'warning') {
                return true
            }
            return false
        },

        computedError() {
            if (this.state === 'error') {
                return true
            }
            return false
        },

        computedWhite() {
            if (this.styles === 'white') {
                return true
            }
            return false
        },

        computedBlack() {
            if (this.styles === 'black') {
                return true
            }
            return false
        }
    },
    methods: {
        handleClick(event: Event) {
            /**
             * Click event
             * @type {Event}
             */
            this.$emit('click', event)
        }
    }
})
</script>

<style lang="scss">
button,
.button {
    margin: auto;
    font-weight: 500;
    font-size: 1.2rem;
    text-transform: none;
    text-decoration: none;
    letter-spacing: 1.5px;
    fill: $white;
    color: $white;
    background-color: $primary;
    border: 2px solid $primary;
    padding: 10px 30px 10px 30px;
    cursor: pointer;
    transition: 0.3s all ease;
    animation: 1s appear;
    @include border-radius;

    &.success {
        background-color: $green;
        border-color: $green;

        &:hover,
        &:focus {
            color: $green;
        }
    }

    &.error {
        background-color: $red;
        border-color: $red;

        &:hover,
        &:focus {
            color: $red;
        }
    }

    &.warning {
        background-color: $yellow;
        border-color: $yellow;

        &:hover,
        &:focus {
            color: $yellow;
        }
    }

    &.white {
        background-color: $white;
        color: $primary;
        border-color: $white;

        &:hover,
        &:focus {
            background-color: $primary;
            color: $white;
        }
    }

    &.black {
        background-color: $black;
        color: $white;
        border-color: $black;

        &:hover,
        &:focus {
            background-color: $white;
            color: $black;
        }
    }

    &.color-black {
        color: $black;

        &:hover,
        &:focus {
            background-color: $black;
            color: $white;
        }
    }

    &.color-white {
        color: $white;
    }

    &.no-border {
        border: none;
    }

    &.border-black {
        border: solid 1px $black;
    }

    &:hover,
    &:focus {
        background-color: $white;
        color: $primary;
        text-decoration: none;
    }

    &.bg-dark-grey {
        border: none;
    }

    &.disabled,
    &.disabled:hover,
    &.disabled:focus {
        display: inline-block; // For IE
        color: $light-grey;
        cursor: not-allowed;
        text-decoration: none;
        background-color: $dark-grey;
        border-color: $dark-grey;
    }
}
</style>
