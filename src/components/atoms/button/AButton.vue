<template>
    <component
        :is="tag"
        :id="id"
        class="button"
        :class="[{ disabled: disabled }, getState, getStyles]"
        :href="href"
        :to="to"
        :target="computedTarget"
        :title="computedTitle"
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
    name: 'AButton',
    props: {
        /** ID attribute */
        id: {
            type: String,
            default: null
        },

        /** Href HTML attribute for link as button - renders an <a> component */
        href: {
            type: String,
            default: null
        },

        /** "to" prop for vue-router - renders a <a> */
        to: {
            type: [Object, String],
            default: null
        },

        /** Type HTML attribute - button, reset, submit */
        type: {
            type: String,
            default: null,
            required: false,
            validator(value) {
                return ['button', 'reset', 'submit'].includes(value)
            }
        },

        /** Target HTML attribute - _blank, _self, _top */
        target: {
            type: String,
            default: null,
            validator(value) {
                return ['_blank', '_self', '_top'].includes(value)
            }
        },

        /** Title HTML attribute */
        title: {
            type: String,
            default: null
        },

        /** "state" prop - success, warning or error */
        state: {
            type: String,
            default: null,
            required: false,
            validator(value) {
                return ['success', 'warning', 'error'].includes(value)
            }
        },

        /** "styles" prop - dark or light */
        styles: {
            type: String,
            default: null,
            required: false,
            validator(value) {
                return ['light', 'dark'].includes(value)
            }
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
                title = 'Envoyer le formulaire'
            }

            return title
        },

        tag() {
            if (this.href || this.to) return 'a'
            return 'button'
        },

        getState(): String | null {
            return this.state
        },

        getStyles(): String | null {
            return this.styles
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
$primary: #009CDE;
$red: #d92550;
$yellow: #FFCE00;
$green: #3ac47d;
$white: #fff;
$black: #2B2B2B;
$dark-grey: #929292;
$light-grey: #E1E1E1;

button,
.button {
    margin: auto;
    font-weight: 500;
    font-size: 0.8rem;
    text-transform: none;
    text-decoration: none;
    letter-spacing: 1.5px;
    fill: $white;
    color: $white;
    background-color: $primary;
    border: 2px solid $primary;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: 0.3s all ease;
    animation: 1s appear;
    line-height: 1;

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

    &.light {
        background-color: $white;
        color: $primary;
        border-color: $white;

        &:hover,
        &:focus {
            background-color: $primary;
            color: $white;
        }
    }

    &.dark {
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
