<template>
    <div class="navbar">
       <AList :items="items" :horizontal="true" without-chips />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AButton from '../../atoms/button/AButton.vue'
import ALink from '../../atoms/link/ALink.vue'
import AList from '../../atoms/list/AList.vue'

export default Vue.extend({
    name: 'MNavbar',
    components: {
        AList
    },

    props: {
        type: {
            type: String,
            default: 'ul'
        },
        items: {
            type: Array,
            default: (): Array<any> => [AButton, ALink],
        },
        withoutChips: {
            type: Boolean,
            default: true
        },
        horizontal: {
            type: Boolean,
            default: true
        }
    },
})

</script>

<style lang="scss">
.nav-list {
    display: flex;
}
.horizontal {
    align-items: center;
}

</style>
