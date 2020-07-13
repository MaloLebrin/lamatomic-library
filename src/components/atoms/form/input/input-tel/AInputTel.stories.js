import { storiesOf } from '@storybook/vue'
import AInputTel from './AInputTel.vue'
const wrapper = {
    components: { AInputTel }
}

storiesOf('Atoms/Form/Inputs', module).add('Phone default', () => ({
    ...wrapper,
    template:
        '<AInputTel default />'
}))
.add(' Phone with alert', () => ({
    ...wrapper,
    template: `<AInputTel  verif-validity />`,
}))

