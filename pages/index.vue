<template>
    <div id="home" class="container">
        <div>
            <Logo />
            <div class="row">
                <div class="col-12">
                    <h1 class="title">
                        Ici la superbe page d'accueil
                    </h1>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <Button to="/">
                        Accueil
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
#home {
}
</style>
