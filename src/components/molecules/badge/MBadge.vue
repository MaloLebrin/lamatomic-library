<template>
    <div class="m-badge" :class="{ 'horizontal': horizontal }">
        <AImage :class="{ 'horizontal': horizontal }"  :src="src" />
        <AText :class="{ 'without-text': withoutText, 'horizontal': horizontal}">{{ label }}</AText>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AText from '@/components/atoms/text/AText.vue'
import AImage from '@/components/atoms/image/AImage.vue'

export default Vue.extend({
    name: "MBadge",

    components: {
        AText,
        AImage
    },

    props: {
        label: {
            type: String,
            default: null
        },

        withoutText: {
            type: Boolean,
            default: false
        },

        horizontal: {
            type: Boolean,
            default: false
        },

        src: {
            type: String,
            default: "https://placehold.it/350x150"
        }
    }

})
</script>

<style lang="scss">
.m-badge {
    display: inline-block;
    position: relative;
    text-align: center;

    .a-image {
        animation: 1s appear;
        border: 0.5px solid #000;
        border-radius: 100%;
        display: block;
        padding: 5px;
        width: 4rem;
    }

    .a-text {
        &.without-text {
            display: none;
        }

        &.horizontal {
            margin-left: 1rem;
        }
    }

    &.horizontal {
        align-items: center;
        display: flex;
        flex-direction: row;

        &.a-image {
            width: 20rem;
        }
    }
}
</style>
