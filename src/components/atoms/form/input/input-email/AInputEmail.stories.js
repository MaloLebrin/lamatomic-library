import { storiesOf } from '@storybook/vue'
import AInputEmail from './AInputEmail.vue'
const wrapper = {
    components: { AInputEmail }
}

storiesOf('Atoms/Inputs/Email', module)
    .add('Default', () => ({
        ...wrapper,
        template: '<AInputEmail  />'
    }))

    .add('With email verification', () => ({
        ...wrapper,
        template: `<AInputEmail verif-validity />`,
    }))
