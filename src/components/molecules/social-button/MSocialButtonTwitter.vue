<template>
    <MSocialButton class="m-social-button-twitter" :src="require('./svg/twitter.svg')" :href="href" :title="title"/>
</template>

<script lang="ts">
import Vue from 'vue'
import MSocialButton from './MSocialButton.vue'

export default Vue.extend({
    name: 'MSocialButtonTwitter',
    components: {
        MSocialButton,
    },

    props: {
        href: {
            type: String,
            default: 'https://www.twitter.com'
        },
        title: {
            type: String,
            default: 'Accéder à la page Twitter'
        }
    },
})
</script>
