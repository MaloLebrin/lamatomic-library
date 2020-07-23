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
    flex-wrap: wrap;
    flex-direction: row;

    .list {
        flex-basis: auto;

        .list-item {
            height: 100%;
            width: 100%;
            padding: 1rem;
            box-shadow: 0 3px 6px 0 rgba(140,152,164,.25);
            vertical-align: middle;

            .img-partner {
                height: 210px;
                width: 290px;
             }
        }
    }
}
</style>
