import { storiesOf } from '@storybook/vue'
import AInputTel from './AInputTel.vue'
const wrapper = {
    components: { AInputTel }
}

storiesOf('Atoms/Form/Inputs', module).add('Tel default', () => ({
    ...wrapper,
    template:
        '<AInputTel default />'
}))
.add(' Tel with alert', () => ({
    ...wrapper,
    template: `<AInputTel  verif-validity />`,
}))

