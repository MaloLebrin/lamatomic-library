import { storiesOf } from '@storybook/vue'
import AInputText from './AInputText.vue'
const wrapper = {
    components: { AInputText }
}

storiesOf('Atoms/Inputs', module).add(
    'Text',
    () => ({
        ...wrapper,
        template: '<AInputText/>'
    }),
    { info: true }
)
