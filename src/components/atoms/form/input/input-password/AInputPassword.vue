<template>
    <div class="a-input-password-wrapper">
        <div class="a-input-group">
            <AInput
                v-model="password"
                v-bind="$attrs"
                :type="passwordType"
                class="a-input-password"
                :class="[strongVerif && password.length > 0 ? { success: isPasswordValid, error: !isPasswordValid } : '']"
                :placeholder="placeholder"
                :required="required"
            />

            <AImage
                :src="require('./svg/' + (hidePassword ? 'eye-solid.svg' : 'eye-slash-solid.svg'))"
                class="icon-password"
                type="icon"
                :title="(hidePassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe')"
                @click.native="hidePassword = !hidePassword"
            />
        </div>

        <div v-if="strongVerif && password.length > 0">
            <AText class="password-validity-message" :class="{ success: isPasswordValid, error: !isPasswordValid }">
                <AText v-if="isPasswordValid" span>
                    Votre mot de passe est valide.
                </AText>

                <AText v-if="!isPasswordValid" span>
                    Votre mot de passe est incorrect. Celui-ci doit contenir au moins 8 caractères dont :
                    1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (!, #, $, %, & ou ?)
                </AText>
            </AText>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'
import AText from '@/components/atoms/text/AText.vue'
import AImage from '@/components/atoms/image/AImage.vue'

export default Vue.extend({
    name: 'AInputPassword',

    components: {
        AInput,
        AText,
        AImage
    },

    inheritAttrs: false,

    props: {
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
            hidePassword: true,
            REGEX_PASSWORD: new RegExp(
               /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$/g
            )
        }
    },

    computed: {
        isPasswordValid(this: any): Boolean {
            return this.password.length > 0 && this.checkPassword(this.password)
        },

        passwordType(): String {
            return this.hidePassword ? 'password' : 'text'
        }
    },

    methods: {
        checkPassword(this: any, value: String): Boolean {
            return this.REGEX_PASSWORD.test(value)
            // Minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter,
            // 1 special character (!#$%&?) and 1 number without space.
       },
    }
})
</script>

<style lang="scss">
$error-color: #d92550;
$success-color: #3ac47d;

.a-input-password-wrapper {
    .a-input-group {
        display: inline-block;
        position: relative;

        .a-input.a-input-password {
            + .icon-password {
                border-radius: 50px;
                bottom: 0;
                cursor: pointer;
                margin: auto;
                opacity: 35%;
                padding: 3px 6px;
                position: absolute;
                right: 1px;
                top: 0;
                width: 20px;
            }
        }
    }

    .password-validity-message {
        border-radius: 0.3rem;
        display: inline-block;
        font-size: 0.9rem;
        margin-top: 0.5rem;
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
