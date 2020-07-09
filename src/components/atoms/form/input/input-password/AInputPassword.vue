<template>
    <div>
        <div class="input-wrapper">
            <input
                v-model="password"
                class="input-password"
                :class="{ success: passwordValid, error: !passwordValid }"
                :type="passwordType"
                :placeholder="placeholder"
                :required="required"
                @keyup="validPassword()"
            />
            <img :src="require('./svg/' + (hidePassword ? 'eye-solid.svg' : 'eye-slash-solid.svg'))" class="icon-password" type="icon" @click="hidePassword = !hidePassword"/>
        </div>
        <div v-if="strongVerif && password.length > 0">
            <p class="password-message" :class="{ success: passwordValid, error: !passwordValid }">
                <span v-if="passwordValid">Votre mot de passe est valide.</span>
                <span v-if="!passwordValid">Votre mot de passe est incorrect. Celui-ci doit contenir au moins 8 caractères dont : 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (!, #, $, %, & ou ?)</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputPassword',

        props: {
        id: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Votre mot de passe'
        },
        required: {
            type: Boolean,
            default: true
        },
        strongVerif: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            password: '',
            passwordValid: false,
            hidePassword: true,
            REGEX_PASSWORD: new RegExp(
               /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/g
            )
        }
    },

    computed: {
        passwordType():String {
            return this.hidePassword ? 'password' : 'text'
      }
    },

    methods: {
        validPassword() {
            this.passwordValid = this.REGEX_PASSWORD.test(this.password)
            // Minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, , 1 spécial caracter (!#$%&?) and 1 number with no spaces.
       },
    }
})
</script>

<style lang="scss">
$primary: #009CDE;
$red: #d92550;
$green: #3ac47d;

input,
.input {
    border: 0.1rem solid $primary;
    &.success {
        border: 0.1rem solid $green;
    }
    &.error {
        border: 0.1rem solid $red;
    }

}

.input-wrapper {
    display: inline-block;
    position: relative;
}

.icon-password {
    position: absolute;
    right: 1px;
    width: 20px;
    border-radius: 50px;
    padding: 3px 6px;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 35%;
}
.password-message {
    display: inline-block;
    margin-top: 0.5rem;
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
