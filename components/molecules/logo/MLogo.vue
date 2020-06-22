<template>
    <ALink
        class="logo-lamacompta"
        to="accueil"
        title="Logo Lamacompta"
        external
        rel="sidebar"
        no-line
    >
        <!-- <LamaLogo class="logo-lamacompta" /> -->
        <AImage
            src="svg/logo.svg"
            title="Le super Lamalogo"
            alt="Logo Lamacompta"
        />
    </ALink>
</template>

<script lang="ts">
import Vue from 'vue'
// import LamaLogo from 'svg/logo.svg?inline'

export default Vue.extend({
    name: 'MLogo'
    // components: { LamaLogo }
})
</script>

<style lang="scss">
.logo-lamacompta {
    margin: auto;
    animation: 1s appear;
}
</style>
