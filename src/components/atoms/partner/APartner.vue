<template>
    <ALink
        :href="href"
        class="partner"
        :title="title"
        no-line
    >
        <AImage
            class="img-partner"
            :src="src"
            :alt="alt"
        />
    </ALink>
</template>

<script lang="ts">
import Vue from 'vue'
import { ALink, AImage } from '@/entry'

export default Vue.extend({
    name: 'APartner',
    components: {
        AImage,
        ALink
    },

    props: {
        type: {
            type: String,
            default: 'default',
        },
        src: {
            type: String,
            default: null,
        },
        alt: {
            type: String,
            default: 'mon logopartenaire'
        },
        href: {
            type: String,
            default: null
        }, 
        title: {
            type: String,
            default: null
        }
    },

})

</script>

<style lang="scss">
.partner {
    margin: auto;
    animation: 1s appear;
}
</style>
