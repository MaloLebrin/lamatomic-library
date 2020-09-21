<template>
    <ASvg
        v-bind="$attrs"
        class="a-icon"
        :height="sizeIcon"
        :width="sizeIcon"
    >
    <slot />
    </ASvg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'AIcon',

    props: {
        size: {
            type: String,
            default: null,
            validator(value) {
                return ['xs', 's', 'm', 'l',].includes(value)
            }
        }
    },

    computed: {
        sizeIcon(this: any) {
            switch (this.size) {
                case 'xs':
                    return '23px'

                case 's':
                    return '50px'

                case 'm':
                    return '100px'

                case 'l':
                    return '200px'

                default:
                    return '100px'
            }
        }
    },
})
</script>

<style lang="scss">
.a-icon {
    animation: 1s appear;
    text-decoration: none;
}
</style>
