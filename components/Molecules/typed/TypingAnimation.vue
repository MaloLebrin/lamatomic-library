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
// import Heading from 'Heading.vue'
// import Text from 'Text.vue'

Vue.use(VueTypedJs)

export default {
    name: 'TypingAnimation',
    // component: {
    //     Heading,
    //     Text
    // },
    props: {
        loop: { type: Boolean, default: true },
        backSpeed: { type: Number, default: 10 },
        strings: { type: String, default: 'Je suis un lamacomptable' }
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
