<template>
    <MSocialButton :src="require('../svg/instagram.svg')" :href="href" :title="title"/>
</template>

<script lang="ts">
import Vue from 'vue'
import MSocialButton from '../../social-button/MSocialButton.vue'

export default Vue.extend({
    name: 'MSocialButtonInstagram',
    components: {
        MSocialButton,
    },

    props: {
        href: {
            type: String,
            default: 'https://www.Instagram.com'
        }
    },
})
</script>
