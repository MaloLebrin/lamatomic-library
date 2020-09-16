<template>
    <div class="a-input-checkbox-wrapper">
        <AInput
            type="checkbox"
            class="a-input-checkbox"
            :value="value"
            :checked="shouldBeChecked"
            @change="toggle"
            v-on="$listeners"
        />

        <div class="checkbox-box">
            <svg viewBox="0 0 21 21">
                <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4
                L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputCheckbox',

    components: {
        AInput
    },

    model: {
        prop: 'modelValue',
        event: 'input'
    },

    props: {
        /** Value of checkbox */
        value: {
            type: [String, Boolean],
            required: true
        },

        /** Whether the checkbox is checked. Can also be checked programatically using v-bind. */
        checked: {
            type: Boolean,
            default: false
        },

        /** This is a necessary prop for using v-model with this component. Should NOT be set */
        modelValue: {
            type: [String, Array, Boolean],
            default: undefined
        }
    },

    computed: {
        shouldBeChecked () {
            if (this.modelValue === undefined) {
                return this.checked
            }

            if (Array.isArray(this.modelValue)) {
                return this.modelValue.includes(this.value)
            }

            return !!this.modelValue
        }
    },

    watch: {
        checked(this: any, newValue) {
            if (newValue !== this.shouldBeChecked) {
                this.toggle()
            }
        }
    },

    mounted(this: any) {
        if (this.checked && !this.shouldBeChecked) {
            this.toggle()
        }
    },

    methods: {
        toggle(this: any) {
            let value

            if (Array.isArray(this.modelValue)) {
                value = [...this.modelValue]

                if (this.shouldBeChecked) {
                    value.splice(value.indexOf(this.value), 1)
                } else {
                    value.push(this.value)
                }
            } else {
                value = !this.shouldBeChecked
            }

            this.$emit('input', value)
        }
    }
})
</script>

<style lang="scss">
$size: 1.2rem;
$background: #fff;
$border: #d1d6ee;
$border-hover: #bbc1e1;
$primary: #009cde;
$tick: #fff;

.a-input-checkbox-wrapper {
    display: inline-block;
    position: relative;

    .checkbox-box {
        background: $background;
        border-radius: 0.3rem;
        box-shadow: inset 0 0 0 var(--s, 1px) var(--b, $border);
        cursor: pointer;
        height: $size;
        margin-right: 0.3rem;
        position: relative;
        top: 0.2rem;
        transition: all 0.6s;
        width: $size;

        &:hover,
        &:focus {
            --b: var(--border-active, #{$primary});
        }

        > svg {
            display: block;
            fill: none;
            height: $size;
            left: 0;
            pointer-events: none;
            position: absolute;
            stroke: var(--stroke, $primary);
            stroke-dasharray: var(--a, 86.12);
            stroke-dashoffset: var(--o, 86.12);
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2px;
            top: 0;
            transform: scale(var(--scale, 1)) translateZ(0);
            transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
            width: $size;
        }
    }

    .a-input.a-input-checkbox {
        display: none;

        &:checked {
            + .checkbox-box {
                --b: var(--border-active, #{$primary});
                --s: 2px;

                transition-delay: 0.1s;

                svg {
                    --a: 16.1 86.12;
                    --o: 102.22;
                }
            }
        }
    }
}
</style>
