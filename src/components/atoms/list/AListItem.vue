<template>
    <li class="a-list-item">
        <slot />
    </li>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AListItem',
})
</script>
