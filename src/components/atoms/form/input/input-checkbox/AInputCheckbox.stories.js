import { storiesOf } from '@storybook/vue'
import AInputCheckbox from './AInputCheckbox.vue'
const wrapper = {
    components: { AInputCheckbox }
}

storiesOf('Atoms/Form/Inputs', module).add('Checkbox', () => ({
    ...wrapper,
    template: '<AInputCheckbox />'
}))
