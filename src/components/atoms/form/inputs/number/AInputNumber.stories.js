import { storiesOf } from '@storybook/vue'
import AInputNumber from './AInputNumber.vue'

const wrapper = {
    components: { AInputNumber }
}

storiesOf('Atoms/Form/Inputs/Number', module)
    .addParameters({ component: AInputNumber })

    .add('Default', () => ({
        ...wrapper,
        template: '<AInputNumber name="your-number" />'
    }))

    .add('With number verification', () => ({
        ...wrapper,
        template: `<AInputNumber name="your-number" checkValidity />`
    }))
