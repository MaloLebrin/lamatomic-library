import { storiesOf } from '@storybook/vue'
import MScrollToTop from './MScrollToTop.vue'

const wrapper = {
    components: { MScrollToTop }
}

storiesOf('Molecules/ScrollToTop', module)
    .add('Default (light)', () => ({
        ...wrapper,
        template: `<MScrollToTop/>`
    }))

    .add('In dark', () => ({
        ...wrapper,
        template: `<MScrollToTop styles="dark"/>`
    }))
