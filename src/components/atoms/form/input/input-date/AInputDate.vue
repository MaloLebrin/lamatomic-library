<template>
    <v-date-picker
        v-model="date"
        class="input-date"
        :class="{'is-dark': isDark}"
        :mode="mode"
        :color="color"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import VCalendar from 'v-calendar' // https://vcalendar.io/

Vue.use(VCalendar);
export default Vue.extend({
    name: 'AInputDate',
    props: {
        mode: {
            type: String,
            default: 'single',
            validator(value) {
                return ['single', 'multiple', 'range'].includes(value)
            }
        },

        isDark: {
            type: Boolean,
            default: false
        },

        color: {
            type: String,
            default: 'blue',
            validator(value) {
                return ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'].includes(value)
            }
        }
    },

    data() {
        return {
            date: new Date()
        }
    }
})
</script>

<style lang="scss">
$primary: #009CDE;
$darkGray: #444444;

input,
.input {
    &-date {
        position: absolute;
    }

    &.is-dark {
        background-color: $darkGray;
    }
}
</style>
