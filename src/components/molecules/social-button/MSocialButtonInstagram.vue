<template>
    <MSocialButton class="m-social-button-instagram" src="./svg/instagram.svg" :href="href" :title="title"/>
</template>

<script lang="ts">
import Vue from 'vue'
import MSocialButton from './MSocialButton.vue'

export default Vue.extend({
    name: 'MSocialButtonInstagram',

    components: {
        MSocialButton,
    },

    props: {
        href: {
            type: String,
            default: 'https://www.instagram.com'
        },

        title: {
            type: String,
            default: 'Accéder à la page Instagram'
        }
    }
})
</script>
