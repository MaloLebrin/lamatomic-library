import { storiesOf } from '@storybook/vue'
import MTyper from './MTyper.vue'

const wrapper = {
    components: { MTyper }
}

storiesOf('Molecules/Typer', module)
    .addParameters({ component: MTyper })

    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                strings: [
                    'Café et thé à volonté',
                    'No costume',
                    'International',
                    'Cabinet à impact positif'
                ]
            }
        },
        template: `<MTyper :strings="strings" />`
    }))
