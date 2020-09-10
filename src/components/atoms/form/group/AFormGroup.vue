<template>
    <div class="a-form-group">
        <ALabel :required="required"> {{ label }}</ALabel>
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ALabel from '../label/ALabel.vue'

export default Vue.extend({
    name: 'AFormGroup',

    components: {
        ALabel,
    },

    props: {
        id: {
            type: String,
            default: null,
        },

        label: {
            type: String,
            default: null
        },

        required: {
            type: Boolean,
            default: false
        }
    },
})
</script>

