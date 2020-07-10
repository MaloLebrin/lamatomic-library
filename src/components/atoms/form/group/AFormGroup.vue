<template>
    <div :id="id" class="form-group">
        <ALabel :for="id"/>
        <slot></slot>
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
            required: true
        },
        type: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
})
</script>

