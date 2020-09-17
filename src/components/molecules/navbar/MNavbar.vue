<template>
    <nav class="m-navbar">
        <AList :horizontal="horizontal" without-chips>
            <slot />
        </AList>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { AList } from '@/components'

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

    .a-list-item {
        margin-bottom: 1.5rem;
    }
}
</style>
