<template>
    <AInput
        class="a-input-hidden"
        type="hidden"
        v-on="$listeners"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputHidden',

    components: {
        AInput
    }
})
</script>
