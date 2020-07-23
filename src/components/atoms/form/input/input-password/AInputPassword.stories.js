import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import AInputPassword from './AInputPassword.vue'

const wrapper = {
    components: { AInputPassword }
}

storiesOf('Atoms/Form/Inputs/Password', module)
    .add('Default', () => ({
        ...wrapper,
        template: `<AInputPassword name="your-password" />`,

        methods: { action: action('hidePassword') }
    }))

    .add('With strong verification', () => ({
        ...wrapper,
        template: `<AInputPassword name="your-password" strongVerif />`,
        methods: { action: action('hidePassword') }
    }))
