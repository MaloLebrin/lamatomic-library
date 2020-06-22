import { storiesOf } from '@storybook/vue'
import ALogo from './ALogo.vue'

const wrapper = {
    components: { ALogo }
}

storiesOf('Atoms/Logo', module).add('Default', () => ({
    ...wrapper,
    template: '<ALogo />'
}))
