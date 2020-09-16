q<template>
    <div class="a-input-email-wrapper">
        <AInput
            v-model="email"
            v-bind="$attrs"
            type="email"
            class="a-input-email"
            :class="[checkValidity && email.length > 0 ? { success: isEmailValid, error: !isEmailValid } : '']"
            :placeholder="placeholder"
            v-on="$listeners"
        />

        <div v-if="checkValidity && email.length > 0">
            <AText class="email-validity-message" :class="{ success: isEmailValid, error: !isEmailValid }">
                <AText v-if="isEmailValid" span>Votre adresse email est valide.</AText>
                <AText v-if="!isEmailValid" span>Votre adresse email est incorrecte.</AText>
            </AText>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AText from '@/components/atoms/text/AText.vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputMail',

    components: {
        AInput,
        AText
    },

    inheritAttrs: false,

    props: {
        placeholder: {
            type: String,
            default: 'lama@lamacompta.co'
        },

        checkValidity: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            email: '',
            REGEX_MAIL: new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        }
    },

    computed: {
        isEmailValid(this: any): Boolean {
            return this.checkEmail(this.email)
        }
    },

    methods: {
        checkEmail(this: any, value: String): Boolean {
            return this.REGEX_MAIL.test(value)
        }
    }
})
</script>

<style lang="scss">
$error-color: #d92550;
$success-color: #3ac47d;

.a-input-email-wrapper {
    .email-validity-message {
        border-radius: 0.3rem;
        display: inline-block;
        font-size: 0.9rem;
        padding: 0.4rem;

        &.success {
            background-color: rgba(lighten($success-color, 30%), 0.3);
            color: $success-color;
        }

        &.error {
            background-color: rgba(lighten($error-color, 30%), 0.3);
            color: $error-color;
        }
    }
}
</style>
