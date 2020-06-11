<template>
    <vue-typed-js
        :strings="[
            'Café et thé à volonté',
            'No costume',
            'International',
            'Cabinet à impact positif'
        ]"
        :loop="true"
        :backSpeed="10"
    >
        <h2><span class="typing"></span></h2>
    </vue-typed-js>
</template>

<script>
import Vue from 'vue'
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

export default {
    name: 'TypingAnimation',
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
