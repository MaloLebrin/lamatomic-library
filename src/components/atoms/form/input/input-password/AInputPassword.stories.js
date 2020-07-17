import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import AInputPassword from './AInputPassword.vue'
const wrapper = {
    components: { AInputPassword }
}

storiesOf('Atoms/Inputs', module).add('Password default', () => ({
    ...wrapper,
    template: `<AInputPassword />`,

    methods: { action: action('hidePassword') }
}))
    .add(' Password with alert', () => ({
        ...wrapper,
        template: `<AInputPassword  strong-verif />`,
        methods: { action: action('hidePassword') }
    }))
