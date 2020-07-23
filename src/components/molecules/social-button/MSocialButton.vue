<template>
    <AButton
        class="m-social-button"
        :title="title"
        :href="href"
        target="_blank"
    >
        <AImage
            :src="src"
            :alt="title"
        />
    </AButton>
</template>

<script lang="ts">
import Vue from 'vue'
import AImage from '../../atoms/image/AImage.vue'
import AButton from '../../atoms/button/AButton.vue'

export default Vue.extend({
    name: 'MSocialButton',
    components: {
        AImage,
        AButton
    },

    props: {
        title: {
            type: String,
            default: 'Accéder à cette page'
        },
        src: {
            type: String,
            default: null
        },
        href: {
            type: String,
            default: null
        }
    },

})

</script>

<style lang="scss">
.m-social-button {
    animation: 1s appear;
    border-radius: 100%;
    display: block;
    height: 20px;
    padding: 5px;
    width: 20px;

    .image {
        height: 100%;
        width: 100%;
    }

    &:hover {
        .image {
            filter: invert(47%) sepia(95%) saturate(2181%) hue-rotate(166deg) brightness(91%) contrast(104%);
        }
    }
}
</style>
