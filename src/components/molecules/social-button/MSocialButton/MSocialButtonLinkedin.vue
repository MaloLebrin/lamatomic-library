<template>
    <MSocialButton :src="require('../svg/linkedin.svg')" :href="href" :title="title"/>
</template>

<script lang="ts">
import Vue from 'vue'
import MSocialButton from '../../social-button/MSocialButton.vue'

export default Vue.extend({
    name: 'MSocialButtonLinkedin',
    components: {
        MSocialButton,
    },

    props: {
        href: {
            type: String,
            default: 'https://www.Linkedin.com'
        }
    },
})
</script>
