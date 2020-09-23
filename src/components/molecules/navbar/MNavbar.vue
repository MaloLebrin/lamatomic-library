<template>
    <nav class="m-navbar">
        <AList :horizontal="horizontal" without-chips>
            <slot />
        </AList>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import AList from '@/components/atoms/list/AList.vue'

export default Vue.extend({
    name: 'MNavbar',

    components: { AList },

    props: {
        horizontal: {
            type: Boolean,
            default: true
        }
    },
})

</script>

<style lang="scss">
.m-navbar {
    > .a-list {
        padding-left: 0;
    }
}
</style>
