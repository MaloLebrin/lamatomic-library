<template>
    <ALink
        class="m-logo"
        to="/"
        title="Me rendre à la page d'accueil"
        no-line
    >
        <AImage
            :src="src"
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
        src: {
            type: String,
            default: "http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg"
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
