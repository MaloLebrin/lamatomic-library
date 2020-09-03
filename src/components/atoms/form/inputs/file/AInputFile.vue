<template>
    <ALabel :html-for="id" class="a-input-file-wrapper">
        <AButton custom-tag="div" class="a-select-button">
            <AText v-if="value && value.name" span>Fichier sélectionné : {{ value.name }}</AText>
            <AText v-else span>{{ placeholder }}</AText>
        </AButton>

        <AInput
            :id="id"
            type="file"
            class="a-input-file"
            :name="name"
            :disabled="disabled"
            :multiple="multiple"
            tabindex="-1"
            @change="handleFileChange"
        />
    </ALabel>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'
import ALabel from '../../label/ALabel.vue'
import AButton from '../../../button/AButton.vue'
import AText from '../../../text/AText.vue'

export default Vue.extend({
    name: 'AInputFile',

    components: {
        AInput, ALabel, AButton, AText
    },

    props: {
        id: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default: null
        },

        disabled: {
            type: Boolean,
            default: false
        },

        multiple: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: 'Choisir un fichier'
        }
    },

    data() {
        return {
            value: {
                type: Object,
                default: null
            }
        }
    },

    methods: {
        handleFileChange(e: any) {
            this.$emit('input', e.target.files[0])
            this.value = e.target.files[0]
        }
    }
})
</script>

<style lang="scss">
.a-input-file-wrapper {
    .a-input.a-input-file {
        display: none;
    }
}
</style>
