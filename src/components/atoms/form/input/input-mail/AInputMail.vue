<template>
    <div class="input-wrapper">
        <input
            :id="id"
            v-model="mail"
            class="input-mail"
            type="email"
            :placeholder="placeholder"
            @keyup="validMail()"
        />

        <div v-if="verifValidity && mail.length > 0">
            <p class="mail-message" :class="{ success: mailValid, error: !mailValid }">
                <span v-if="mailValid">Votre Email est valide.</span>
                <span v-if="!mailValid">Votre Email est incorrect. </span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputMail',

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
            mail: '',
            mailValid: false,
            REGEX_MAIL: new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        }
    },

    methods: {
        validMail() {
            this.mailValid = this.REGEX_MAIL.test(this.mail)
        }
    }
})
</script>

<style lang="scss">
input,
.input {
    &.input-email {
        vertical-align: middle;
        display: inline-block;
    }
}

.mail-message {
    display: inline-block;
    padding: 0.4rem;
    font-size: 0.9rem;
    border-radius: 0.3rem;

    &.success {
        color: #4F8A10;
        background-color: #DFF2BF;
    }

    &.error {
        background-color:#FFD2D2aa;
        color: #9F6000;
    }
}
</style>
