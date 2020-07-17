<template>
    <input
        :id="id"
        type="search"
        class="search"
        :placeholder="placeholder"
        :value="value"
        :name="name"
    />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputSearch',
    props: {
        id: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: 'votre recherche'
        },
        name: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        }

    }
})
</script>

<style lang="scss">
input,
.input {
    &.search {
        resize: horizontal;
    }
}
</style>
