<template>
    <ALink
        class="m-logo"
        to="/"
        title="Me rendre à la page d'accueil"
        no-line
    >
        <AImage
            :src="require('./svg/' + logoFileName)"
            alt="Logo Lamacompta"
        />
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
        type: {
            type: String,
            default: 'default',
            validator(value) {
                return ['default', 'default-inline', 'white', 'white-inline'].includes(value)
            }
        }
    },

    data() {
        return {
            logoFileName: getLogoFileName(this.type)
        }
    }
})

const getLogoFileName = function(type: String): String {
    switch (type) {
        case 'default':
            return 'logo-default.svg'
        case 'default-inline':
            return 'logo-default-inline.svg'
        case 'white':
            return 'logo-white.svg'
        case 'white-inline':
            return 'logo-white-inline.svg'
        default:
            return 'logo-default.svg'
    }
}
</script>

<style lang="scss">
.m-logo {
    animation: 1s appear;
    margin: auto;
}
</style>
