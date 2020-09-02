<template>
<div class="a-input-number-wrapper">
    <AInput
        v-model="number"
        type="number"
        class="a-input-number"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :value="value"
    />

    <div v-if="checkValidity && number.length > 0">
        <AText class="number-validity-message" :class="{ success: isNumberValid, error: !isNumberValid }">
            <AText v-if="isNumberValid" span>Votre nombre est valide.</AText>
            <AText v-if="!isNumberValid" span>Votre nombre est incorrecte.</AText>
        </AText>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputNumber',

    components: {
        AInput
    },

    props: {
        placeholder: {
            type: String,
            default: 'Ecrivez ici'
        },
        min: {
            type: Number,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
        value: {
            type: Number,
            default: null,
        },
        checkValidity: {
            type: Boolean,
            default: false
        }

    },

    data() {
        return {
            number: '',
            REGEX_NUMBER: new RegExp(/^[0-9]+$/)
        }
    },

    computed: {
        isNumberValid(this: any): Boolean {
            return this.checkNumber(this.number)
        }
    },

    methods: {
        checkNumber(this: any, value: String): Boolean {
            return this.REGEX_NUMBER.test(value)
        }
    }


})
</script>

<style lang="scss">
$error-color: #d92550;
$success-color: #3ac47d;

.a-input-number-wrapper {
    .number-validity-message {
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
