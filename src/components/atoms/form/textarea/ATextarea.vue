<template>
    <textarea
        :id="id"
        class="a-textarea"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        :cols="cols"
        v-on="$listeners"
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
$primary: #009cde;

.a-textarea {
    border: 0.1rem solid $primary;
    height: 120px;
    overflow: hidden;
    padding: 5px;
    resize: auto;
    width: 600px;
}
</style>
