<template>
    <MSocialButton class="m-social-button-facebook" :src="require('../svg/facebook.svg')" :href="href" :title="title"/>
</template>

<script lang="ts">
import Vue from 'vue'
import MSocialButton from './MSocialButton.vue'

export default Vue.extend({
    name: 'MSocialButtonFacebook',
    components: {
        MSocialButton,
    },

    props: {
        href: {
            type: String,
            default: 'https://www.facebook.com'
        },
        title: {
            type: String,
            default: 'Accéder à la page Facebook'
        }
    },
})
</script>
