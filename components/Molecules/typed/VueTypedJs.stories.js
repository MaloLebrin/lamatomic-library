import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
import VueTypedJs from './Molecules/typed/VueTypedJs.vue'

const wrapper = {
    components: { VueTypedJs }
}

storiesOf('VueTypedJs', module).add(
    'default heading typer',
    () => ({
        ...wrapper,
        template: `<vue-typed-js :strings="['Café et thé à volonté,No costume,International,Cabinet à impact positif']">
            <h1 class="typing"></h1>
            </vue-typed-js>`
    }),
    { info: true }
)
