import { storiesOf } from '@storybook/vue'
import AInputDate from './AInputDate.vue'

const wrapper = {
    components: { AInputDate }
}

storiesOf('Atoms/Form/Inputs/Dates', module)
    .add('Date single (default)', () => ({
        ...wrapper,
        template: '<AInputDate />'
    }))

    .add('Date single dark', () => ({
        ...wrapper,
        template: '<AInputDate isDark />'
    }))

    .add('Date multiple and red', () => ({
        ...wrapper,
        template: '<AInputDate mode="multiple" color="red" />'
    }))

    .add('Date range and teal', () => ({
        ...wrapper,
        template: '<AInputDate mode="range" color="teal" />'
    }))
