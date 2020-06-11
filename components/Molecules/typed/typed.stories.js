import { storiesOf } from '@storybook/vue'
import Typed from './typed.vue'

const wrapper = {
    components: { Typed }
}

storiesOf('Molecules/typed', module).add(
    'H1 typed',
    () => ({
        ...wrapper,
        template: `<vue-typed-js :strings="['First text', 'Second Text']">
        <h1 class="typing"></h1>
      </vue-typed-js>`
    }),
    { info: true }
)
