<template>
    <nav class="navbar">
        <AList :items="items" :horizontal="horizontal" without-chips />
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import AList from '@/components/atoms/list/AList.vue'

export default Vue.extend({
    name: 'MNavbar',

    components: { AList },

    props: {
        items: {
            type: Array,
            default: null
        },

        horizontal: {
            type: Boolean,
            default: true
        }
    },
})

</script>

<style lang="scss">
.navbar {
    > .list {
        padding-left: 0;
    }

    .list-item {
        margin-bottom: 1.5rem;
    }
}
</style>
