import { storiesOf } from '@storybook/vue'
import AInputEmail from './AInputEmail.vue'

const wrapper = {
    components: { AInputEmail }
}

storiesOf('Atoms/Form/Inputs/Email', module)
    .addParameters({ component: AInputEmail })

    .add('Default', () => ({
        ...wrapper,
        template: '<AInputEmail name="your-email" />'
    }))

    .add('With email verification', () => ({
        ...wrapper,
        template: `<AInputEmail name="your-email" checkValidity />`,
    }))
