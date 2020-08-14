<template>
    <header class="o-header" :class="{'o-header--is-open': menuIsOpen }">
        <MLogo :src="srcLogo" />
        <MNavbar class="m-navbar-desktop" :items="items" @click="toggleMenu" />
        <AHamburger  class="o-header-hamburger" :class="{'a-hamburger--is-open': menuIsOpen}" @click="toggleMenu"/>
        <MNavbar class="o-header-menu m-navbar-mobile" :class="{ 'menu-open': menuIsOpen }" :items="computedMobileItems" :horizontal="horizontal" @click="toggleMenu" />
    </header>
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
            mobileItems: {
                type: Array,
                default: null
            },
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

        computed: {
            computedMobileItems() {
                if (Array.isArray(this.mobileItems)) {
                    return this.mobileItems
                }

                return this.items
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
            background-color: #f8f8f8;
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

