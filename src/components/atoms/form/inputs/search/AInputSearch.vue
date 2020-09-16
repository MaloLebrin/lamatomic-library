<template>
    <AInput
        type="search"
        class="a-input-search"
        :placeholder="placeholder"
        v-on="$listeners"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputSearch',

    components: {
        AInput
    },

    props: {
        placeholder: {
            type: String,
            default: 'Votre recherche'
        }
    }
})
</script>

<style lang="scss">
.a-input.a-input-search {
    resize: horizontal;
}
</style>
