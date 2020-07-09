<template>
    <AInput
        :id="id"
        type="text"
        class="text"
        :placeholder="placeholder"
        :contenteditable="true"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputText',
    components: {
        AInput
    },
    props: {
        id: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Ecrivez ici'
        },
        contenteditable: {
            type: Boolean,
            default: true
        }
    }
})
</script>

<style lang="scss">
$primary: #009CDE;
input,
.input {
    &.text {
        border: 3px solid #009cd2;
        overflow: hidden;
        resize: auto;
    }
}
</style>
