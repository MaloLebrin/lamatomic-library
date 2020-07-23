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
$primary: #009cde;
$red: #d92550;
$yellow: #ffce00;
$green: #3ac47d;
$white: #fff;
$black: #2b2b2b;
$dark-grey: #929292;
$light-grey: #e1e1e1;

.o-header {

    $this: &;
    $animation-speed: 0.8s;
    $animation-easing: cubic-bezier(0.37, 0.96, 0.22, 1.01);

    align-items: center;
    display: flex;
    flex-direction: row;
    position: relative;

    .inner {
        padding: 0 15px;
    }

    .navbar-desktop {
        display: none;
    }

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
        opacity: 0;
        padding-left: 20px;
        padding-top: 5rem;
        position: absolute;
        top: 0;
        transition: all $animation-speed ease-in-out;
        transition-timing-function: $animation-easing;
        visibility: hidden;
        width: 20rem;
        z-index: 1;

        &.menu-open {
            opacity: 1;
            right: 0;
        }
    }

    &--is-open {
        #{$this}-menu {
            background-color: $primary;
            transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }
    }

    &-hamburger {
        margin-right: 25px;
        position: relative;
        z-index: 2;
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
