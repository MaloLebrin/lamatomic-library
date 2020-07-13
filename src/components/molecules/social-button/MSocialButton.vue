<template>
    <AButton
        class="m-social-button"
        :title="computedTitle"
    >
        <AImage
            :src="require('./' + computedSrc)"
            alt="social button"
        />
    </AButton>
</template>

<script lang="ts">
import Vue from 'vue'
import AImage from '../../atoms/image/AImage.vue'
import AButton from '../../atoms/button/AButton.vue'

export default Vue.extend({
    name: 'MLogo',
    components: {
        AImage,
        AButton
    },

    props: {
        type: {
            type: String,
            default: 'new',
            validator(value) {
                return ['new', 'facebook', 'twitter', 'instagram', 'linkedin'].includes(value)
            }
        },
        title: {
            type: String,
            default: 'Accéder à cette page'
        },
        name: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: '../logo/svg/logo-default.svg'
        }
    },

    data() {
        return {
            logoFileName: getLogoFileName(this.type),
            titles: getTitles(this.type, this.name)
        }
    },

    computed: {
        computedSrc(): String {
            switch (this.type) {
                case 'new':
                    return this.src
                default:
                    return 'svg/' + this.logoFileName
            }
        },

        computedTitle(): String {
            return 'Accéder à la page ' + this.titles
        }
    }
})

const getLogoFileName = function(type: String): String {
    switch (type) {
        case 'facebook':
            return 'facebook-brands.svg'
        case 'twitter':
            return 'twitter-brands.svg'
        case 'instagram':
            return 'instagram-brands.svg'
        case 'linkedin':
            return 'linkedin-brands.svg'
        default:
            return ''
    }
}

const getTitles = function (type: String, name: String): String {
    switch (type) {
        case 'new':
            return name
        case 'facebook':
            return 'facebook'
        case 'twitter':
            return 'twitter'
        case 'instagram':
            return 'instagram'
        case 'linkedin':
            return 'linkedin'
        default:
            return name
    }
}
</script>

<style lang="scss">

.m-social-button {
    margin: auto;
    animation: 1s appear;
    border-radius: 50%;
    padding: 1%;

    &:hover {
        .image {
            filter: invert(47%) sepia(95%) saturate(2181%) hue-rotate(166deg) brightness(91%) contrast(104%);
        }
    }

    .image {
        width: 40px;
        height: 40px;
    }
}

</style>
