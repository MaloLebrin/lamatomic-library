import { storiesOf } from '@storybook/vue'
import AInputHidden from './AInputHidden.vue'
const wrapper = {
    components: { AInputHidden }
}

storiesOf('Atoms/Inputs', module).add('Hidden', () => ({
    ...wrapper,
    template: `<AInputHidden />`
}))
