<template>
    <AInput
        v-bind="$attrs"
        type="text"
        class="a-input-text"
        :placeholder="placeholder"
        :contenteditable="editable"
        v-on="$listeners"
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
        placeholder: {
            type: String,
            default: 'Ecrivez ici'
        },

        editable: {
            type: Boolean,
            default: true
        }
    }
})
</script>

<style lang="scss">
$primary: #009cde;

.a-input.a-input-text {
    overflow: hidden;
    resize: auto;
}
</style>
