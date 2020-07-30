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
            type: [String, Object],
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
.m-social-button.a-button {
    border-radius: 100%;
    display: block;
    height: 30px;
    padding: 5px;
    width: 30px;

    .a-image {
        height: 100%;
        width: 100%;
    }

    &:hover {
        .a-image {
            filter: invert(47%) sepia(95%) saturate(2181%) hue-rotate(166deg) brightness(91%) contrast(104%);
        }
    }
}
</style>
