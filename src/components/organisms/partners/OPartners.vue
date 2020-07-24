<template>
    <div class="o-partners">
        <AList :items="items" :horizontal="horizontal" without-chips />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AList from '@/components/atoms/list/AList.vue'

export default Vue.extend({
    name: 'OPartners',

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
.o-partners {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .a-list {
        flex-basis: auto;

        .a-list-item {
            box-shadow: 0 3px 6px 0 rgba(140, 152, 164, 0.25);
            height: 100%;
            padding: 1rem;
            vertical-align: middle;
            width: 100%;

            .img-partner {
                height: 210px;
                width: 290px;
            }
        }
    }
}
</style>
