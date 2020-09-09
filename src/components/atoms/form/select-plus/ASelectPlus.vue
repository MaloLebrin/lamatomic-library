<template>
  <div class="a-select-plus">
    <slot name="top-slot" />

    <MultiSelect
        v-model="value"
        :options="options"
        :searchable="searchable"
        :close-on-select="closeOnSelect"
        :show-labels="showLabels"
        :placeholder="placeholder"
    >
        <slot />
    </MultiSelect>

    <slot name="bottom-slot" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MultiSelect from 'vue-multiselect'

export default Vue.extend({
    name: 'ASelectPlus',

    components: { MultiSelect },

    props: {
        options: {
            type: Array,
            required: true,
        },

        placeholder: {
            type: String,
            default: 'Sélectionner une option'
        },

        searchable: {
            type: Boolean,
            default: false
        },

        closeOnSelect: {
            type: Boolean,
            default: true
        },

        showLabels: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            value: '',
        }
    }
})
</script>

<style lang="scss">
/* stylelint-disable selector-class-pattern */
$primary: #009cde;
$white: #fff;
$silver: #c0c0c0;

.a-select-plus {
    cursor: pointer;

    .multiselect,
    .multiselect__input,
    .multiselect__single {
        font-family: inherit;
        font-size: 16px;
        touch-action: manipulation;
    }

    .multiselect__input,
    .multiselect__single {
        background: $white;
        border: 0;
        border-image: none;
        border-radius: 5px;
        box-sizing: border-box;
        display: inline-block;
        line-height: 20px;
        min-height: 20px;
        outline: none;
        position: relative;
        transition: border 0.1s ease;
        vertical-align: top;
        width: 100%;
    }

    .multiselect {
        box-sizing: content-box;
        display: block;
        min-height: 40px;
        outline: none;
        position: relative;
        text-align: left;
        width: 100%;

        .multiselect__select {
            box-sizing: border-box;
            cursor: pointer;
            display: block;
            font-size: 1.4rem;
            height: 100%;
            line-height: 16px;
            margin: 0;
            padding: 4px 8px;
            position: absolute;
            right: 1px;
            text-align: center;
            text-decoration: none;
            top: 1px;
            transition: transform 0.2s ease;
            width: 40px;

            &::before {
                border-color: #2b2b2b transparent transparent;
                border-style: solid;
                border-width: 5px 5px 0;
                color: #2b2b2b;
                content: '';
                margin-top: 4px;
                position: relative;
                right: 0;
                top: 65%;
            }
        }
    }

    .multiselect--active {
        z-index: 50;

        .multiselect__select {
            transform: rotateZ(180deg);
        }
    }

    .multiselect__tags {
        align-items: center;
        background: $white;
        border: 1px solid #e8e8e8;
        border-radius: 5px;
        display: flex;
        font-size: 14px;
        min-height: 40px;
        padding: 0 40px 0 8px;

        .multiselect__single {
            background: $white;
            border: 0;
            border-radius: 5px;
            box-sizing: border-box;
            display: inline-block;
            line-height: 20px;
            min-height: 20px;
            padding: 0 0 0 5px;
            position: relative;
            transition: border 0.1s ease;
            width: 100%;
        }
    }

    .multiselect__content-wrapper {
        background: $white;
        border: 1px solid #e8e8e8;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top: 0;
        display: block;
        max-height: 240px;
        overflow: auto;
        position: absolute;
        width: 100%;
        z-index: 50;
    }

    .multiselect__content {
        display: inline-block;
        list-style: none;
        margin: 0;
        min-width: 100%;
        padding: 0;
    }

    .multiselect__option {
        display: flex;
        line-height: 16px;
        min-height: 40px;
        padding: 12px;
        position: relative;
        text-decoration: none;
        text-transform: none;
        vertical-align: middle;
        white-space: nowrap;

        &::after {
            font-size: 1.3rem;
            line-height: 40px;
            padding-left: 20px;
            padding-right: 12px;
            position: absolute;
            right: 0;
            top: 0;
        }

    }

    .multiselect__option--highlight {
        background: $primary;
        color: $white;
        outline: none;

        &::after {
            background: $primary;
            color: $white;
            content: attr(data-select);
        }
    }

    .multiselect__option--selected {
        background: $primary;
        color: $white;
        font-weight: bold;

        &::after {
            color: $silver;
            content: attr(data-selected);
        }
    }
}
</style>
