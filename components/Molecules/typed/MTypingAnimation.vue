<template>
    <vue-typed-js :strings="strings" :loop="true" :back-speed="10">
        <span class="typing"></span>
    </vue-typed-js>
</template>

<script>
import Vue from 'vue'
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

export default {
    name: 'MTypingAnimation',
    props: {
        loop: { type: Boolean, default: true },
        backSpeed: { type: Number, default: 10 },
        strings: { type: Array, default: () => ['Je suis un lamacomptable'] }
    },
    data() {
        return {
            typedObj: null
        }
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
