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
                :src="hiddenIcon"
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
import AText from '@/components/atoms/text/AText.vue'
import AImage from '@/components/atoms/image/AImage.vue'
import AInput from '../AInput.vue'

const visibleIcon = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJleWUiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUgZmEtdy0xOCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik01NzIuNTIgMjQxLjRDNTE4LjI5IDEzNS41OSA0MTAuOTMgNjQgMjg4IDY0UzU3LjY4IDEzNS42NCAzLjQ4IDI0MS40MWEzMi4zNSAzMi4zNSAwIDAgMCAwIDI5LjE5QzU3LjcxIDM3Ni40MSAxNjUuMDcgNDQ4IDI4OCA0NDhzMjMwLjMyLTcxLjY0IDI4NC41Mi0xNzcuNDFhMzIuMzUgMzIuMzUgMCAwIDAgMC0yOS4xOXpNMjg4IDQwMGExNDQgMTQ0IDAgMSAxIDE0NC0xNDQgMTQzLjkzIDE0My45MyAwIDAgMS0xNDQgMTQ0em0wLTI0MGE5NS4zMSA5NS4zMSAwIDAgMC0yNS4zMSAzLjc5IDQ3Ljg1IDQ3Ljg1IDAgMCAxLTY2LjkgNjYuOUE5NS43OCA5NS43OCAwIDEgMCAyODggMTYweiI+PC9wYXRoPjwvc3ZnPg=='

const invisibleIcon = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJleWUtc2xhc2giIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1leWUtc2xhc2ggZmEtdy0yMCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0zMjAgNDAwYy03NS44NSAwLTEzNy4yNS01OC43MS0xNDIuOS0xMzMuMTFMNzIuMiAxODUuODJjLTEzLjc5IDE3LjMtMjYuNDggMzUuNTktMzYuNzIgNTUuNTlhMzIuMzUgMzIuMzUgMCAwIDAgMCAyOS4xOUM4OS43MSAzNzYuNDEgMTk3LjA3IDQ0OCAzMjAgNDQ4YzI2LjkxIDAgNTIuODctNCA3Ny44OS0xMC40NkwzNDYgMzk3LjM5YTE0NC4xMyAxNDQuMTMgMCAwIDEtMjYgMi42MXptMzEzLjgyIDU4LjFsLTExMC41NS04NS40NGEzMzEuMjUgMzMxLjI1IDAgMCAwIDgxLjI1LTEwMi4wNyAzMi4zNSAzMi4zNSAwIDAgMCAwLTI5LjE5QzU1MC4yOSAxMzUuNTkgNDQyLjkzIDY0IDMyMCA2NGEzMDguMTUgMzA4LjE1IDAgMCAwLTE0Ny4zMiAzNy43TDQ1LjQ2IDMuMzdBMTYgMTYgMCAwIDAgMjMgNi4xOEwzLjM3IDMxLjQ1QTE2IDE2IDAgMCAwIDYuMTggNTMuOWw1ODguMzYgNDU0LjczYTE2IDE2IDAgMCAwIDIyLjQ2LTIuODFsMTkuNjQtMjUuMjdhMTYgMTYgMCAwIDAtMi44Mi0yMi40NXptLTE4My43Mi0xNDJsLTM5LjMtMzAuMzhBOTQuNzUgOTQuNzUgMCAwIDAgNDE2IDI1NmE5NC43NiA5NC43NiAwIDAgMC0xMjEuMzEtOTIuMjFBNDcuNjUgNDcuNjUgMCAwIDEgMzA0IDE5MmE0Ni42NCA0Ni42NCAwIDAgMS0xLjU0IDEwbC03My42MS01Ni44OUExNDIuMzEgMTQyLjMxIDAgMCAxIDMyMCAxMTJhMTQzLjkyIDE0My45MiAwIDAgMSAxNDQgMTQ0YzAgMjEuNjMtNS4yOSA0MS43OS0xMy45IDYwLjExeiI+PC9wYXRoPjwvc3ZnPg=='

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
        },

        hiddenIcon(): String {
            return (this.hidePassword ? visibleIcon : invisibleIcon)
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
