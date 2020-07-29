import { storiesOf } from '@storybook/vue'
import AInputTel from './AInputTel.vue'

const wrapper = {
    components: { AInputTel }
}

storiesOf('Atoms/Form/Inputs/Tel', module)
    .addParameters({ component: AInputTel })

    .add('Default', () => ({
        ...wrapper,
        template: '<AInputTel name="your-tel" />'
    }))

    .add('With tel verification', () => ({
        ...wrapper,
        template: `<AInputTel name="your-tel" checkValidity />`
    }))
