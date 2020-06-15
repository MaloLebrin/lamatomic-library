import { storiesOf } from '@storybook/vue'
import TypingAnimation from './TypingAnimation.vue'

const wrapper = {
    components: { TypingAnimation }
}

storiesOf('Molecules/TypingAnimation', module).add(
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
        template: `<TypingAnimation :strings="strings" />`
    }),
    { info: true }
)
