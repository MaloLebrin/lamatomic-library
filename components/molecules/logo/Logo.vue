<template>
    <div>
        <Link
            to="accueil"
            title="Logo Lamacompta"
            external="false"
            rel="sidebar"
        >
            <AImage
                src="./Logo.svg"
                title="Le super Lamalogo"
                alt="Logo Lamacompta"
            />
        </Link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Logo'
})
</script>

<style lang="scss">
.logo-lamacompta {
    margin: auto;
    animation: 1s appear;

    .st0 {
        fill: none;
    }
    .st1 {
        fill: #ffffff;
    }
    .st2 {
        fill: #009cde;
    }
    .st3 {
        fill: #c8e2e8;
    }
    .st4 {
        display: none;
        fill: #ffffff;
    }
    .st5 {
        fill: url(#SVGID_1_);
    }
    .st6 {
        fill: url(#SVGID_2_);
    }
    .st7 {
        fill: url(#SVGID_3_);
    }
    .st8 {
        display: none;
    }
    .st9 {
        display: inline;
        fill: #e8f6f9;
    }
    .st10 {
        display: inline;
        fill: #b0b2bf;
    }
    .st11 {
        display: inline;
        fill: #d8ecf3;
    }
    .st12 {
        display: inline;
        fill: #d9ecf3;
    }
    .st13 {
        display: inline;
        opacity: 9e-2;
        fill: #636363;
    }
    .st14 {
        display: inline;
        fill: #ffffff;
        stroke: #000000;
        stroke-miterlimit: 10;
    }
    .st15 {
        display: inline;
        fill: #aae4e5;
    }
    .st16 {
        display: inline;
        fill: #8cd0d6;
    }
    .st17 {
        display: inline;
        opacity: 0.1;
        fill: #6d6d6d;
    }
    .st18 {
        display: inline;
    }
    .st19 {
        fill: none;
        stroke: #6d6d6d;
        stroke-miterlimit: 10;
    }
    .st20 {
        fill: none;
        stroke: #6d6d6d;
        stroke-miterlimit: 10;
        stroke-dasharray: 5.9969, 5.9969;
    }
    .st21 {
        display: inline;
        fill: none;
        stroke: #6d6d6d;
        stroke-miterlimit: 10;
        stroke-dasharray: 6;
    }
}
</style>
