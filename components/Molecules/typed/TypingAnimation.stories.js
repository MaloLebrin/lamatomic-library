import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
import TypingAnimation from './TypingAnimation.vue'

const wrapper = {
    components: { TypingAnimation }
}

storiesOf('Molecules', module).add(
    'Typing animation',
    () => ({
        ...wrapper,
        template: `<TypingAnimation/>`
    }),
    { info: true }
)
