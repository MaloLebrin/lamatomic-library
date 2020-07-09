<template>
    <input
        :id="id"
        class="input input-url"
        type="url"
        :placeholder="placeholder"
    />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputUrl',
    props: {
        id: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: 'https://lamacompta.co'
        },
        placeholder: {
            type: String,
            default: 'Entrez votre url'
        }
    }
})
</script>

<style lang="scss"></style>
