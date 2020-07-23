<template>
    <div class="a-input-url-wrapper">
        <AInput
            v-model="url"
            v-bind="$attrs"
            type="url"
            class="a-input-url"
            :class="[checkValidity && url.length > 0 ? { success: isUrlValid, error: !isUrlValid } : '']"
            :placeholder="placeholder"
        />

        <div v-if="checkValidity && url.length > 0">
            <AText class="url-validity-message" :class="{ success: isUrlValid, error: !isUrlValid }">
                <AText v-if="isUrlValid" span>Votre URL est valide.</AText>
                <AText v-if="!isUrlValid" span>Votre URL est invalide.</AText>
            </AText>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'
import AText from '@/components/atoms/text/AText.vue'

export default Vue.extend({
    name: 'AInputUrl',

    components: {
        AInput,
        AText
    },

    inheritAttrs: false,

    props: {
        placeholder: {
            type: String,
            default: 'Entrez votre URL'
        },

        checkValidity: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            url: '',
            REGEX_URL: new RegExp(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
            )
        }
    },

    computed: {
        isUrlValid(this: any): Boolean {
            return this.checkUrl(this.url)
        }
    },

    methods: {
        checkUrl(this: any, value: String): Boolean {
            return this.REGEX_URL.test(value)
        }
    }
})
</script>

<style lang="scss">
$error-color: #d92550;
$success-color: #3ac47d;

.a-input-url-wrapper {
    .url-validity-message {
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
