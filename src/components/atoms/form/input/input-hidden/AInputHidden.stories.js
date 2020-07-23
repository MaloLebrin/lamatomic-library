import { storiesOf } from '@storybook/vue'
import AInputHidden from './AInputHidden.vue'
const wrapper = {
    components: { AInputHidden }
}

storiesOf('Atoms/Form/Inputs', module)
    .addParameters({ component: AInputHidden })

    .add('Hidden', () => ({
        ...wrapper,
        template: `<AInputHidden />`
    }))
