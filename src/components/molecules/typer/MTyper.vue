<template>
    <vue-typed-js :strings="strings" :loop="loop" :back-speed="backSpeed">
        <span class="typing"></span>
    </vue-typed-js>
</template>

<script>
import Vue from 'vue'
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

export default {
    name: 'MTyper',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        backSpeed: {
            type: Number,
            default: 10
        },
        strings: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss">
.typed-element {
    align-items: center;
    display: flex;

    .typed-cursor {
        animation: typerBlink 0.7s infinite;
        margin-left: 3px;
        opacity: 1;
        position: relative;
        top: -1px;
    }
}

@keyframes typerBlink {
    50% {
        opacity: 0;
    }
}
</style>
