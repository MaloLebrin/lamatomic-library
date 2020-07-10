import { storiesOf } from '@storybook/vue'
import AInput from './AInput.vue'
const wrapper = {
    components: { AInput }
}

storiesOf('Atoms/AInput', module).add('Défaut', () => ({
    ...wrapper,
    template: '<AInput />'
}))
