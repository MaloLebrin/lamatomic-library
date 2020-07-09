<template>
    <label class="file-select">
        <div class="select-button">
            <span v-if="value">Fichier sélectionné: {{ value.name }}</span>
            <span v-else class="select-button">Choisir un fichier</span>
        </div>
        <input
            :id="id"
            type="file"
            class="file"
            :value="value"
            :name="name"
            :disabled="disabled"
            :multiple="multiple"
            tabindex="-1"
            @change="handleFileChange"
        />
    </label>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputFile',
    props: {
        id: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: true
        },
        value: File
    },
    methods: {
        handleFileChange(e: any) {
            this.$emit('input', e.target.files[0])
        }
    }
})
</script>

<style lang="scss">
$primary: #009CDE;
$red: #d92550;
$yellow: #FFCE00;
$green: #3ac47d;
$white: #fff;
$black: #2B2B2B;
$dark-grey: #929292;
$light-grey: #E1E1E1;

input,
.input {
    &.file {
        width: 100px;
        height: 20px;
        border: 3px solid $primary;
        display: none;

    }
}
.file-select > .select-button {
    display: inline-block;
    margin: auto;
    font-weight: 300;
    font-size: 1.0rem;
    letter-spacing: 1.5px;
    fill: $white;
    color: $white;
    background-color: $primary;
    border: 2px solid $primary;
    border-radius: 5px;
    padding: 8px 20px 8px 20px;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: $white;
        color: $primary;
        text-decoration: none;
    }

}
</style>
