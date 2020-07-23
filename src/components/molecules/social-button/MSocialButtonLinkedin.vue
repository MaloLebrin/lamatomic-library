<template>
    <MSocialButton class="m-social-button-linkedin" src="./svg/linkedin.svg" :href="href" :title="title"/>
</template>

<script lang="ts">
import Vue from 'vue'
import MSocialButton from './MSocialButton.vue'

export default Vue.extend({
    name: 'MSocialButtonLinkedin',

    components: {
        MSocialButton,
    },

    props: {
        href: {
            type: String,
            default: 'https://www.linkedin.com'
        },

        title: {
            type: String,
            default: 'Accéder à la page LinkedIn'
        }
    }
})
</script>
