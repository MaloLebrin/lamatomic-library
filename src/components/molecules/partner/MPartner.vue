<template>
    <ALink
        :href="href"
        class="m-partner"
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
import  AImage  from '@/components/atoms/image/AImage.vue'
import ALink from '@/components/atoms/link/ALink.vue'


export default Vue.extend({
    name: 'MPartner',
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
            default: "Partner's logo"
        },
        href: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: "Partner's logo"
        }
    },

})

</script>

<style lang="scss">
.m-partner {
    margin: auto;
    animation: 1s appear;
}
</style>
