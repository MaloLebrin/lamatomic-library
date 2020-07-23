<template>
    <input
        :id="id"
        class="a-input"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :value="value"
        :required="required"
        :disabled="disabled"
        v-on="inputListeners"
    />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInput',

    props: {
        id: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default: null,
        },

        value: {
            type: [String, Boolean, Object, Array, Function],
            default: null
        },

        type: {
            type: String,
            default: null
        },

        placeholder: {
            type: String,
            default: null
        },

        required: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        inputListeners() {
            const vm: any = this

            return Object.assign({},
                // We add parent listeners
                this.$listeners,
                // Then we add custom listeners
                {
                    // To be sure v-model works
                    input(event: any) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    }
})
</script>

<style lang="scss">
$primary: #009cde;
$black: #2b2b2b;
$error-color: #d92550;
$success-color: #3ac47d;

.a-input {
    background-color: transparent;
    border-color: $primary;
    border-radius: 0.1875rem;
    border-style: solid;
    border-width: 0.1rem;
    box-sizing: border-box;
    color: $black;
    cursor: text;
    display: inline-block;
    font-size: 0.875rem;
    line-height: 1.5rem;
    margin: 0;
    min-height: 2rem;
    outline: none;
    padding: 0.25rem 0.5rem;
    text-align: start;
    text-shadow: none;
    vertical-align: middle;

    &.success {
        border: 0.1rem solid $success-color;
    }

    &.error {
        border: 0.1rem solid $error-color;
    }
}
</style>
