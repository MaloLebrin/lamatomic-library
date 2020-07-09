<template>
    <input
        :id="id"
        v-model="value"
        class="input"
        :type="type"
        :placeholder="placeholder"
        :name="name"
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
        type: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        inputValue: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            value: this.inputValue
        }
    }

})
</script>

<style lang="scss">
$primary: #009CDE;
$black: #2B2B2B;

input,
.input {
    text-shadow: none;
    text-align: start;
    cursor: text;
    margin: 0em;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-width: 0.125rem;
    border-radius: 0.1875rem;
    border-color: $primary;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    line-height: 2.5rem;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.5rem;
    height: 2rem;
    background-color: transparent;
    color: $black;
    box-sizing: border-box;
}
</style>
