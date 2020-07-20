<template>
    <div class="a-input-email-wrapper">
        <AInput
            :id="id"
            v-model="email"
            class="a-input-email"
            type="email"
            :placeholder="placeholder"
            @keyup="checkEmail()"
        />

        <div v-if="verifValidity && email.length > 0">
            <AText class="email-message" :class="{ success: emailValid, error: !emailValid }">
                <AText v-if="emailValid" span>Votre adresse email est valide.</AText>
                <AText v-if="!emailValid" span>Votre adresse email est incorrecte.</AText>
            </AText>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'
import AText from '@/components/atoms/text/AText.vue'

export default Vue.extend({
    name: 'AInputMail',

    components: { AInput, AText },

    props: {
        id: {
            type: String,
            default: null
        },

        placeholder: {
            type: String,
            default: 'lama@lamacompta.co'
        },

        verifValidity: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            email: '',
            emailValid: false,
            REGEX_MAIL: new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        }
    },

    methods: {
        checkEmail() {
            this.emailValid = this.REGEX_MAIL.test(this.email)
        }
    }
})
</script>

<style lang="scss">
.a-input.a-input-email-wrapper {
    .a-input-email {
        display: inline-block;
        vertical-align: middle;
    }

    .email-message {
        border-radius: 0.3rem;
        display: inline-block;
        font-size: 0.9rem;
        padding: 0.4rem;

        &.success {
            background-color: #dff2bf;
            color: #4f8a10;
        }

        &.error {
            background-color: #ffd2d2aa;
            color: #9f6000;
        }
    }
}
</style>
