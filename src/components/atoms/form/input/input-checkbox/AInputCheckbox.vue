<template>
    <input
        :id="id"
        type="checkbox"
        class="checkbox"
        :name="name"
    />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AInputCheckbox',
    props: {
        id: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: true
        }
    }
})
</script>

<style lang="scss">
input,
.input {
    &.checkbox {
        height: 20px;
        width: 20px;
    }
}
</style>
