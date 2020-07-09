<template>
    <AInput
        :id="id"
        class="hidden"
        :type="type"
        :value="value"
        :name="name"
        :hidden="hidden"
        :required="required"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputHidden',
    components: {
        AInput
    },
    props: {
        id: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        hidden: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="scss">
input,
.input {
    &.hidden {
        color: #009cd2;
    }
}
</style>
