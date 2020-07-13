<template>
    <AInput
        type="radio"
        name="name"
        class="radio"
        value="1"
        :radio="radio"
        @change="onChange($event)"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputRadio',
    components: {
        AInput
    },
    props: {
        id: {
            type: String,
            default: null
        }
    },
    methods: {
        onChange(event: any) {
            const optionText = event.target.value
            console.log(optionText)
        }
    }
})
</script>

<style lang="scss">
input,
.input {
    &.radio {
        border-color: #009cd2;
    }
}
</style>
