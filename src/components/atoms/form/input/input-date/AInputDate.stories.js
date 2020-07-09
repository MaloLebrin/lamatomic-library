import { storiesOf } from '@storybook/vue'
import AInputDate from './AInputDate.vue'
const wrapper = {
    components: { AInputDate }
}

storiesOf('Atoms/Inputs/Dates', module).add('Date single', () => ({
    ...wrapper,
    template: '<AInputDate />'
}))

storiesOf('Atoms/Inputs/Dates', module).add('Date single : dark', () => ({
    ...wrapper,
    template: '<AInputDate isDark/>'
}))

storiesOf('Atoms/Inputs/Dates', module).add('Date multiple and red', () => ({
    ...wrapper,
    template: '<AInputDate mode="multiple" color="red"/>'
}))

storiesOf('Atoms/Inputs/Dates', module).add('Date range and teal', () => ({
    ...wrapper,
    template: '<AInputDate mode="range" color="teal"/>'
}))
