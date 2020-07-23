import { storiesOf } from '@storybook/vue'
import AInputUrl from './AInputUrl.vue'
const wrapper = {
    components: { AInputUrl }
}

storiesOf('Atoms/Form/Inputs', module).add(
    'Url',
    () => ({
        ...wrapper,
        template: '<AInputUrl :placeholder="placeholder"/>'
    }),
    { info: true }
)
