<template>
    <nav class="navbar">
        <div class="container">
            <ul 
                :class="{
                    'without-chips': withoutChips,
                    horizontal: horizontal
                }"
                :footer="footer"
                >
                <li class="nav-item">
                    <ALink>Cabinets</ALink>
                </li>
                <li class="nav-item">
                    <ALink>Offres</ALink> 
                </li>
                <li class="nav-item">
                    <ALink>We are Lamacompta</ALink>
                </li>
                <li v-if="!footer" class="nav-item">
                    <AButton>Déposer mon cv</AButton>
                </li>
                <li v-if="!footer" class="nav-item">
                    <AButton class="light">je suis un cabinet</AButton>
                </li>
                <li v-if="footer" class="nav-item">
                    <ALink>je suis un cabinet</ALink>
                </li>
                <li v-if="footer" class="nav-item">
                    <ALink>Parrainage</ALink>
                </li>
                 <li v-if="footer" class="nav-item">
                    <ALink>Blog Lamacompta</ALink>
                </li>
                <li v-if="footer" class="nav-item">
                    <ALink>Conditions générales d'utilisation</ALink>
                </li>
                <li v-if="footer" class="nav-item">
                    <ALink>Politique de confidentialité</ALink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import AButton from '../../atoms/button/AButton.vue'
import ALink from '../../atoms/link/ALink.vue'

export default Vue.extend({
    name: 'MNavbar',

    components: { ALink, AButton },

    props: {
        type: {
            type: String,
            default: null
        },
        withoutChips: {
            type: Boolean,
            default: true
        },
        horizontal: {
            type: Boolean,
            default: true
        },
        footer: {
            type: Boolean,
            default: false
        }
    },
})

</script>

<style lang="scss">
.horizontal {
    align-items: center;
    display: flex;
}
.without-chips {
    list-style: none;
}
.nav-item {
    margin: 1rem;
}
</style>
