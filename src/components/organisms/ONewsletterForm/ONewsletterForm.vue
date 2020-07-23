<template>
    <div class="o-form-newsletter">
        <AHeading level="2" :class="{'without-title': withoutTitle}" align="center"> {{ NewsletterHeading }}</AHeading>
        <div class="newletter-2-col row">
                <AImage :class="{'without-image': withoutImage}"/>
            <div class="newsletter-content">
                <Atext :align="left">{{ NewsletterText }}</Atext>
                <div class="newsletter-form">
                    <AInputEmail verif-validity />
                    <AButton type="submit" @click="submit">Envoyer</AButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInputEmail from '@/components/atoms/form/input/input-email/AInputEmail.vue'
import AImage from '@/components/atoms/image/AImage.vue'
import AHeading from '@/components/atoms/heading/AHeading.vue'
import AButton from '@/components/atoms/button/AButton.vue'
import Atext from '@/components/atoms/text/AText.vue'

export default Vue.extend({

    name: 'ONewsletterForm',

    components: {
        AInputEmail,
        AImage,
        AHeading,
        AButton,
        Atext
    },
    props: {
        withoutImage: {
            type: Boolean,
            default: false
        },
        withoutTitle: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            NewsletterHeading: "Cassez les codes de la compta avec nous",
            NewsletterText: "Inscrivez-vous à la newsletter et recevez nos offres d’emploi et actus 💪"
        }
    },
})
</script>
<style lang="scss">

.o-form-newsletter {
    display: block;

    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: auto;

    }

    .image {
        margin: auto;

        &.without-image {
            display: none;
        }
    }

    .newsletter-content {
        margin: auto;
        padding-left: 15px;
    }

    .button {
        margin-left: 10px;
    }

    .heading {
        &.without-title {
            display: none;
        }
    }
}
</style>
