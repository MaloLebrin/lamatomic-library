<template>
    <ALink
        class="m-logo"
        to="/"
        title="Me rendre à la page d'accueil"
        no-line
    >
        <AImage v-if="src !== null"
            :src="src"
        />
        <slot />
    </ALink>
</template>

<script lang="ts">
import Vue from 'vue'
import AImage from '../../atoms/image/AImage.vue'
import ALink from '../../atoms/link/ALink.vue'

export default Vue.extend({
    name: 'MLogo',
    components: {
        AImage,
        ALink
    },

    props: {
        src: {
            type: String,
            default: null
        },

    },
})
</script>

<style lang="scss">
.m-logo {
    animation: 1s appear;
    margin: auto;
}
</style>
