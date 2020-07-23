import { storiesOf } from '@storybook/vue'
import AInputMail from './AInputMail.vue'
const wrapper = {
    components: { AInputMail }
}

storiesOf('Atoms/Form/Inputs/Mail', module).add(
    'Mail default',
    () => ({
        ...wrapper,
        template:
            '<AInputMail  />'
    })
)
.add(' Mail with alert', () => ({
    ...wrapper,
    template: `<AInputMail verif-validity />`,
}))

