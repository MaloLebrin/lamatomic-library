<template>
    <AButton
        class="m-social-button"
        :title="title"
        :href="href"
        target="_blank"
    >
        <ASvg
            v-bind="$attrs"
        >
            <slot />
        </ASvg>
    </AButton>
</template>

<script lang="ts">
import Vue from 'vue'
import ASvg from '../../atoms/svg/ASvg.vue'
import AButton from '../../atoms/button/AButton.vue'

export default Vue.extend({
    name: 'MSocialButton',

    components: {
        ASvg,
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

    svg {
        height: 100%;
        width: 100%;

        &:hover {
            fill: #000;
        }
    }

}
</style>
