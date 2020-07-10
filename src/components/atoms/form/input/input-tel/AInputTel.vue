<template>
    <div class="input-wrapper">
            <input
                :id="id"
                v-model="phone"
                class="input - tel"
                :placeholder="placeholder"
                @keyup="validTel()"
            />
        <div  v-if="verifValidity && phone.length > 0">
            <p  class="phone-message" :class="{ success: phoneValid, error: !phoneValid}">
                <span  v-if="phoneValid"> Votre téléphone est valide.</span>
                <span  v-if="!phoneValid">Votre téléphone est invalide</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputTel',
    props: {
        id: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Ecrivez votre téléphone ici'
        },
        verifValidity: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            phone: '',
            phoneValid: false,
            REGEX_TEL: new RegExp(/^((\+)33+ ?|0)[1-9]( ?(\d{2})){4}$/gi)
        }
    },

    methods: {
        validTel() {
            this.phoneValid = this.REGEX_TEL.test(this.phone)
        }
    }
})
</script>

<style lang="scss">
$primary: #009CDE;

input,
.input {
    border: 0.1rem solid $primary;
    &.tel {
        vertical-align: middle;
        display: inline-block;
        min-height: 2.5rem;
    }
}
.phone-message {
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
