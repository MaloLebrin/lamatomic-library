<template>
    <component
        :is="tag"
        class="link underlined underlined--thin"
        :href="href"
        :to="to"
        :target="computedTarget"
        :title="computedTitle"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Link',
    props: {
        href: {
            type: String,
            default: null
        },
        /** "to" prop for vue-router - renders a <nuxt-link> */
        to: {
            type: [Object, String],
            default: null
        },
        /** target attrbitue: _self, _blank... */
        target: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    },
    computed: {
        computedTarget(): String | null {
            return this.target || (this.href ? '_blank' : null)
        },

        computedTitle(): String | null {
            let title = this.title

            if (this.href) {
                title = "Se rendre à l'adresse " + this.href
            }

            if (this.to) {
                title = 'Se rendre à la page ' + this.to
            }

            return title
        },

        tag(): String {
            if (this.to) return 'nuxt-link'
            return 'a'
        }
    }
})
</script>

<style lang="scss">
.link {
    color: $primary;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    animation: 1s appear;
}
</style>
