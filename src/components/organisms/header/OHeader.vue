<template>
    <header class="o-header" :class="{'o-header--is-open': menuIsOpen }">
        <MLogo :src="srcLogo">
            <slot name="LogoSvg" />
        </MLogo>

        <MNavbar class="m-navbar-desktop" @click="toggleMenu">
            <slot name="navBarItems" />
        </MNavbar>

        <AHamburger class="o-header-hamburger" :is-open="menuIsOpen" @click="toggleMenu"/>

        <MNavbar class="o-header-menu m-navbar-mobile" :class="{ 'menu-open': menuIsOpen }" :horizontal="false" @click="toggleMenu">
            <slot name="navBarItemsMobile" />
        </MNavbar>
    </header>
</template>

<script lang="ts">
    import Vue from 'vue'
    import AHamburger from '@/components/atoms/hamburger/AHamburger.vue'
    import MLogo from '@/components/molecules/logo/MLogo.vue'
    import MNavbar from '@/components/molecules/navbar/MNavbar.vue'

    export default Vue.extend({
        name: 'OHeader',

        components: {
            MLogo,
            MNavbar,
            AHamburger
        },

        props: {
            srcLogo: {
                type: String,
                default: null
            }
        },

        data() {
            return {
                menuIsOpen: false
            }
        },

        methods: {
            toggleMenu(this: any) {
                this.menuIsOpen = !this.menuIsOpen
            },
        },
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

    .m-navbar-desktop {
        display: none;
    }

    .m-logo {
        flex-basis: 10%;
        margin-left: 15px;

        .a-image {
            width: 80px;
        }
    }

    .m-navbar {
        max-width: calc(100vw - 40px);
        overflow: hidden;
    }

    &-menu {
        display: flex;
        flex-direction: column;
        left: 100%;
        min-height: 100vh;
        opacity: 0;
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
            background-color: #f8f8f8;
            transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }
    }

    &-hamburger {
        margin-right: 5rem;
        position: relative;
        z-index: 2;

        &.a-hamburger--is-open {
            margin-right: 15rem;
            transition: margin $animation-easing ease-in-out;
        }
    }

    @media screen and (min-width: 992px) {
        .m-logo {
            .a-image {
                width: 120px;
            }
        }

        .m-navbar-desktop {
            display: block;
        }

        .m-navbar-mobile,
        .o-header-hamburger {
            display: none;
        }
    }
}
</style>

