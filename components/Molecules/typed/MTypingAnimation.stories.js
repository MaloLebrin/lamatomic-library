import { storiesOf } from '@storybook/vue'
import MTypingAnimation from './MTypingAnimation.vue'

const wrapper = {
    components: { MTypingAnimation }
}

storiesOf('Molecules/MTypingAnimation', module).add(
    'Défaut',
    () => ({
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
        template: `<MTypingAnimation :strings="strings" />`
    }),
    { info: true }
)
