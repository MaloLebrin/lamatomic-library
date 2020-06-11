import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
import VueTypedJs from './TypedJs.vue'

const wrapper = {
    components: { VueTypedJs }
}

storiesOf('VueTypedJs', module).add(
    'default heading typer',
    () => ({
        ...wrapper,
        template: `<VueTypedJs/>`
    }),
    { info: true }
)
