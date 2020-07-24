<template>
    <a
        class="a-link"
        :class="{
            tel: tel,
            mail: mail,
            rel: rel,
            external: external,
            underlined: computedUnderlined,
            'underlined--thin': computedUnderlined
        }"
        :href="computedHref"
        :to="to"
        :target="computedTarget"
        :title="computedTitle"
        :rel="rel"
    >
        <slot />
    </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ALink',
    props: {
        href: {
            type: String,
            default: null
        },
        tel: {
            type: Boolean,
            default: false
        },
        mail: {
            type: Boolean,
            default: false
        },
        /** "to" prop for vue-router */
        to: {
            type: [Object, String],
            default: null
        },
        /** target attribute _self, _blank... */
        target: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        /** rel attribute: , ... */
        rel: {
            type: String,
            default: null
        },
        /** Ajoute un indicateur indiquant qu'on sort du site */
        external: {
            type: Boolean,
            default: false
        },
        noLine: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedTarget(): String | null {
            if (this.to) {
                return null
            }

            return this.target || (this.href ? '_blank' : null)
        },

        computedTitle(): String | null {
            let title = this.title

            if (this.href) {
                title = "Se rendre à l'adresse " + this.href
            }

            if (this.to) {
                title = 'Se rendre à la page ' + this.to
            }

            if (this.tel) {
                title = 'Appeler le ' + this.href
            }

            if (this.mail) {
                title = 'Ecrire un mail à ' + this.href
            }

            return title
        },

        computedHref(): String | null {
            const href = this.href

            if (this.tel) {
                if (ValidTel(href)) {
                    return 'tel:' + href
                }
            } else if (this.mail) {
                if (ValidMail(href)) {
                    return 'mailto:' + href
                }
            } else if (this.to != null) {
                return null
            }

            return href
        },

        computedUnderlined(): Boolean {
            return !this.noLine
        }
    }
})

const ValidTel = function(portableTest: string) {
    const regex = new RegExp(/^((\+)33+ ?|0)[1-9]( ?(\d{2})){4}$/gi)

    if (regex.test(portableTest)) {
        return true
    }

    return false
}

const ValidMail = function(emailTest: string) {
    const regex = new RegExp(
        '^[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*[.]{1}[a-z]{2,6}$',
        'i'
    )

    if (regex.test(emailTest)) {
        return true
    }

    return false
}
</script>

<style lang="scss">
$primary: #009cde;
$secondary: #002252;
$yellow: #ffce00;
$white: #fff;

.a-link {
    animation: 1s appear;
    color: $primary;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;

    &.underlined {
        background-image: linear-gradient(to right, $yellow 0, $yellow 100%);
        background-position: 0 1.2em;
        background-repeat: no-repeat;
        background-size: 0 100%;
        text-decoration: none;
        transition: background 0.5s;

        &:hover,
        &:focus {
            background-size: 100% 100%;
        }

        &--thin {
            background-image: linear-gradient(to right, $primary 0, $primary 100%);
            padding-bottom: 4px;
        }

        &--thick {
            background-position: 0 -0.1em;
        }

        &--offset {
            background-position: 0 0.2em;
            box-shadow: inset 0 -0.5em 0 0 $white;
        }

        &--gradient {
            background-image: linear-gradient(to right, $yellow 0, $secondary 100%);
            background-position: 0 -0.1em;
        }

        &--reverse {
            background-image: linear-gradient(to right, $yellow 0, $yellow 100%);
            background-position: 100% -0.1em;
            transition: background 1s; //yep, that's a long link
        }
    }
}
</style>
