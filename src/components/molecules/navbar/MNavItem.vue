<template>
    <AListItem class="m-nav-item">
        <slot />
    </AListItem>
</template>

<script lang="ts">
import Vue from 'vue'
import AListItem from '@/components/atoms/list/AListItem.vue'

export default Vue.extend({
    name: 'MNavItem',

    components: {
        AListItem
    }
})
</script>
