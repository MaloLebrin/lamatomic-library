<template>
    <div class="inner">
        <header class="o-header" :class="{'o-header--is-open': menuIsOpen }">
            <MLogo />
            <MNavbar class="navbar-desktop" :items="items" @click="toggleMenu" />
            <AHamburger  class="o-header-hamburger" :class="{'a-hamburger--is-open': menuIsOpen}" @click="toggleMenu"/>
            <MNavbar class="o-header-menu navbar-mobile" :class="{ 'menu-open': menuIsOpen }" :items="items" :horizontal="horizontal" @click="toggleMenu" />
        </header>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import MNavbar from '@/components/molecules/navbar/MNavbar.vue'
    import MLogo from '@/components/molecules/logo/MLogo.vue'
    import AHamburger from '@/components/atoms/hamburger/AHamburger.vue'

    export default Vue.extend({
        name: 'OHeader',
        components: {
            MLogo,
            MNavbar,
            AHamburger
        },
        props: {
            items: {
                type: Array,
                default: null
            },
            horizontal: {
                type: Boolean,
                default: false
            },
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

.o-header {
    .inner {
        padding: 0px 15px;
    }

    .navbar-desktop {
        display: none;
    }

    $this: &;
    $animation-speed: .8s;
    $animation-easing: cubic-bezier(0.37, 0.96, 0.22, 1.01);
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    .logo {
        flex-basis: 10%;
        margin-left: 15px;

        .image {
            width: 80px;
        }
    }

    .navbar {
        margin-right: 15px;
    }

    &-menu {
        display: flex;
        flex-direction: column;
        left: 100%;
        min-height: 100vh;
        position: absolute;
        padding-top: 5rem;
        top: 0;
        transition: all $animation-speed ease-in-out;
        transition-timing-function: $animation-easing;
        visibility: hidden;
        width: 20rem;
        z-index: 1;
        padding-left: 20px;
        opacity: 0;

        &.menu-open {
            opacity: 1;
            right: 0;
        }
    }

    &--is-open {
        #{$this}-menu {
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
        background-color: $primary;
        }
    }

    &-hamburger {
        position: relative;
        z-index: 2;
        margin-right: 25px;
    }

    @media screen and (min-width: 992px) {

        .logo {

        .image {
            width: 120px;
        }
    }
        .navbar-desktop {
            display: block;
        }

        .navbar-mobile,
        .o-header-hamburger {
            display: none;
        }
    }
}
</style>
