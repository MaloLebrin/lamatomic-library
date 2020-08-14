<template>
    <component
        :is="tag"
        :id="id"
        class="a-button"
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
        },

        customTag: {
            type: String,
            default: null,
            validator(value) {
                return ['button', 'a', 'div', 'span', 'i'].includes(value)
            }
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
            if (this.customTag)
                return this.customTag

            if (this.href || this.to)
                return 'a'

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
$primary: #009cde;
$red: #d92550;
$yellow: #ffce00;
$green: #3ac47d;
$white: #fff;
$black: #2b2b2b;
$dark-grey: #929292;
$light-grey: #e1e1e1;

.a-button {
    animation: 1s appear;
    background-color: $primary;
    border: 2px solid $primary;
    border-radius: 5px;
    color: $white;
    cursor: pointer;
    display: inline-block;
    fill: $white;
    font-size: 0.8rem;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    line-height: 1;
    margin: auto;
    padding: 10px;
    padding: 10px 30px;
    text-decoration: none;
    text-transform: none;
    transition: 0.3s all ease;

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
        border-color: $white;
        color: $primary;

        &:hover,
        &:focus {
            background-color: $primary;
            color: $white;
        }
    }

    &.dark {
        background-color: $black;
        border-color: $black;
        color: $white;

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
        border: 0;
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

    &.disabled,
    &.disabled:hover,
    &.disabled:focus {
        background-color: $dark-grey;
        border-color: $dark-grey;
        color: $light-grey;
        cursor: not-allowed;
        display: inline-block; // For IE
        text-decoration: none;
    }
}
</style>
