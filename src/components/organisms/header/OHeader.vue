<template>
    <div class="inner">
        <div class="o-header">
            <MLogo />
            <MNavbar :items="items" @click="toggleMenu" />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import MNavbar from '../../molecules/navbar/MNavbar.vue'
    import MLogo from '../../molecules/logo/MLogo.vue'

    export default Vue.extend({
        name: 'OHeader',
        components: {
            MLogo,
            MNavbar
        },
        props: {
            items: {
                type: Array,
                default: null
            }
        },
        data() {
            return {
                menuIsOpen: false
            }
        },
        methods: {
            toggleMenu() {
                this.menuIsOpen = !this.menuIsOpen
            }
        }
    })
</script>

<style lang="scss">
    $primary: #009CDE;
    $red: #d92550;
    $yellow: #FFCE00;
    $green: #3ac47d;
    $white: #fff;
    $black: #2B2B2B;
    $dark-grey: #929292;
    $light-grey: #E1E1E1;

    .inner {
        padding: 0px 15px;
    }
    .o-header {
        // $this: &;
        // $animation-speed: .4s;
        // $animation-easing: cubic-bezier(0.37, 0.96, 0.22, 1.01);
        background: none;
        text-decoration: none;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;

        .logo {
            flex-basis: 10%;
            margin-left: 15px;
            .image {
                width: 120px;
            }
        }

        .navbar {
            margin-right: 15px;
        }

        //   &-hamburger {
        //     position: relative;
        //     z-index: 6;
        //   }

        //   &-menu {
        //     align-items: flex-start;
        //     background: transparent;
        //     display: flex;
        //     flex-direction: column;
        //     left: 100%;
        //     min-height: 100vh;
        //     position: absolute;
        //     padding-top: 5rem;
        //     top: 0;
        //     transition: transform $animation-speed, opacity $animation-speed, visibility $animation-speed;
        //     transition-timing-function: $animation-easing;
        //     visibility: hidden;
        //     width: 30rem;
        //     z-index: 5;
        //   }

        //   &-overlay {
        //     position: fixed;
        //     width: 100%;
        //     height: 100%;
        //     left: 0;
        //     top: 0;
        //     background: rgba($black, .7);
        //     z-index: 1;
        //     opacity: 0;
        //     visibility: hidden;
        //     transition: opacity $animation-speed, visibility $animation-speed;
        //     transition-timing-function: $animation-easing;
        //   }

        //   &--is-open {
        //     #{$this}-menu {
        //       transform: translate3d(-100%, 0, 0);
        //       visibility: visible;
        //     }

        //     #{$this}-overlay {
        //       opacity: 1;
        //       visibility: visible;
        //     }
        //   }
    }

</style>
