import { storiesOf } from '@storybook/vue'
import AInputCheckbox from './AInputCheckbox.vue'
const wrapper = {
    components: { AInputCheckbox }
}

storiesOf('Atoms/Inputs', module).add('Checkbox', () => ({
    ...wrapper,
    template: '<AInputCheckbox />'
}))
