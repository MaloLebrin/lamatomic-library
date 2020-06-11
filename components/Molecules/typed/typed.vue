<template>
    <vue-typed-js :strings="['First text', 'Second Text']">
        <h1 class="typing"></h1>
    </vue-typed-js>
</template>

<script>
import Vue from 'vue'
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

export default {
    name: 'Typed',
    data() {
        return {
            typedObj: null
        }
    },
    destroyed() {
        this.typedObj.destroy()
    },
    methods: {
        throwError(message) {
            throw new TypeError(message)
        }
    }
}
</script>

<style lang="scss">
.typed-element {
    display: flex;
    align-items: center;

    .typed-cursor {
        opacity: 1;
        animation: typedjsBlink 0.7s infinite;
    }
}

@keyframes typedjsBlink {
    50% {
        opacity: 0;
    }
}
</style>
