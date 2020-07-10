<template>
    <textarea
        :id="id"
        class="textarea"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        :cols="cols"
    >
    </textarea>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Textarea',
    props: {
        id: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Ecrivez votre Lamatexte ici'
        },
        required: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number,
            default: 2
        },
        cols: {
            type: Number,
            default: 1
        }
    }
})
</script>

<style lang="scss">
$primary: #009CDE;

.textarea {
        border: 0.1rem solid $primary;
        width: 600px;
        height: 120px;
        padding: 5px;
        resize: auto;
        overflow: hidden;
    }
</style>
