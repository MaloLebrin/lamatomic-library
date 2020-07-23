<template>
    <label
        :for="htmlFor"
        class="a-label"
    >
        <slot></slot> <span v-if="required" class="required-indicator">*</span>
    </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ALabel',

    props: {
        htmlFor: {
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
$red: #d92550;
$green: #3ac47d;

.a-label {
    font-size: inherit;
    user-select: none;

    &.error {
        color: $red;
    }

    &.success {
        color: $green;
    }

    .required-indicator {
        color: $red;
    }
}
</style>
