<template>
    <div class="a-input-tel-wrapper">
        <AInput
            v-model="telNumber"
            v-bind="$attrs"
            type="tel"
            class="a-input-tel"
            :class="[checkValidity && telNumber.length > 0 ? { success: isTelValid, error: !isTelValid } : '']"
            :placeholder="placeholder"
        />

        <div v-if="checkValidity && telNumber.length > 0">
            <AText class="tel-validity-message" :class="{ success: isTelValid, error: !isTelValid }">
                <AText v-if="isTelValid" span>
                    Votre numéro de téléphone est valide.
                </AText>

                <AText v-if="!isTelValid" span>
                    Votre numéro de téléphone est invalide.
                </AText>
            </AText>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'
import AText from '@/components/atoms/text/AText.vue'

export default Vue.extend({
    name: 'AInputTel',

    components: {
        AInput,
        AText
    },

    inheritAttrs: false,

    props: {
        placeholder: {
            type: String,
            default: 'Votre numéro de téléphone'
        },

        checkValidity: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            telNumber: '',
            REGEX_TEL: new RegExp(/^((\+)33+ ?|0)[1-9]( ?(\d{2})){4}$/gi)
        }
    },

    computed: {
        isTelValid(this: any): Boolean {
            return this.checkTel(this.telNumber)
        }
    },

    methods: {
        checkTel(this: any, value: [Number, String]): Boolean {
            return this.REGEX_TEL.test(value)
        }
    }
})
</script>

<style lang="scss">
$error-color: #d92550;
$success-color: #3ac47d;

.a-input-tel-wrapper {
    .tel-validity-message {
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
