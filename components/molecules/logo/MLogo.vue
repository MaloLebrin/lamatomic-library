<template>
    <ALink
        class="logo-lamacompta"
        to="accueil"
        title="Logo Lamacompta"
        external
        rel="sidebar"
        no-line
    >
        <AImage
            :src="require(`svg/Logo.svg`)"
            title="Le super Lamalogo"
            alt="Logo Lamacompta"
        />
    </ALink>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'MLogo'
})
</script>

<style lang="scss">
.logo-lamacompta {
    margin: auto;
    animation: 1s appear;
}
</style>
