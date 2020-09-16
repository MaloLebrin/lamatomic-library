<template>
    <div class="a-input-radio-wrapper">
        <AInput
            :id="id"
            type="radio"
            class="a-input-radio"
            :value="value"
            :checked="shouldBeChecked"
            :name="name"
            @change="toggle"
            v-on="$listeners"
        />

        <span class="radio-circle"></span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AInput from '../AInput.vue'

export default Vue.extend({
    name: 'AInputRadio',

    components: {
        AInput
    },

    model: {
        prop: 'modelValue',
        event: 'change'
    },

    props: {
        value: {
            type: [String, Boolean],
            required: true
        },

        /** Whether the radio is checked. Can also be checked programatically using v-bind. */
        checked: {
            type: Boolean,
            default: false
        },

        /** This is a necessary prop for using v-model with this component. Should NOT be set */
        modelValue: {
            type: String,
            default: undefined
        },
        name: {
            type: String,
            default: null
        }
    },

    computed: {
        shouldBeChecked() {
            if (this.modelValue == null) {
                return this.checked
            }

            return this.modelValue === this.value
        }
    },

    watch: {
        checked(this: any) {
            if (this.checked) {
                this.toggle()
            }
        }
    },

    mounted(this: any) {
        if (this.checked) {
            this.toggle()
        }
    },

    methods: {
        toggle(this: any) {
            this.$emit('change', this.value)
        }
    },
})
</script>

<style lang="scss">
$primary: #009cde;
$white: #fff;
$black: #2b2b2b;

.a-input-radio-wrapper {
    display: inline-flex;

    .radio-circle {
        align-items: center;
        background: $primary;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        font-size: 2rem;
        height: 1.2rem;
        justify-content: center;
        width: 1.2rem;

        &::before {
            background: $white;
            border-radius: 50%;
            content: '';
            height: 0.5rem;
            opacity: 0;
            transition: opacity 0.2s;
            width: 0.5rem;
        }
    }

    &:focus {
        box-shadow: 0 0 0.6rem rgba($black, 0.4);
    }

    .a-input.a-input-radio {
        display: none;

        &:checked + .radio-circle::before {
            opacity: 1;
        }
    }
}
</style>
