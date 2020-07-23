import { storiesOf } from '@storybook/vue'
import AInputHidden from './AInputHidden.vue'

const wrapper = {
    components: { AInputHidden }
}

storiesOf('Atoms/Form/Inputs', module)
    .addParameters({ component: AInputHidden })

    .add('Hidden (🤓)', () => ({
        ...wrapper,
        template: `<div>
            Bah, oukilé 🤔
            <AInputHidden id="the-input" name="input-hidden" value="batman" />
        </div>`
    }))
