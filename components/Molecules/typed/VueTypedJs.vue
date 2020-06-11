<template>
    <vue-typed-js
        :strings="[
            'Café et thé à volonté,No costume,International,Cabinet à impact positif'
        ]"
        :loop="true"
        @onComplete="doSmth()"
    >
        <h2><span class="typing"></span></h2>
    </vue-typed-js>
</template>

<script>
import Typed from 'typed.js'
import { props, getEventHandlers } from '../config/typed-component.config'

export default {
    name: 'VueTypedJs',
    props,
    data() {
        return {
            typedObj: null
        }
    },
    mounted() {
        this.initTypedJS()
    },
    destroyed() {
        this.typedObj.destroy()
    },
    methods: {
        throwError(message) {
            throw new TypeError(message)
        },
        initTypedJS() {
            const $typed = this.$refs.typedElement.querySelector('.typing')

            if (this.$slots.default.length > 1) {
                this.throwError(
                    `Just one child element allowed inside <${this.$options.name}> component.`
                )
            } else if (this.$slots.default.length === 1) {
                let typedConfig = this.$props
                typedConfig = getEventHandlers(this, typedConfig)
                this.typedObj = new Typed($typed, typedConfig)
            }
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
