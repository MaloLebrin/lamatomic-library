import { storiesOf } from '@storybook/vue'
import MLogo from './MLogo.vue'

const wrapper = {
    components: { MLogo }
}

storiesOf('Molecules/Logo', module)
    .addParameters({ component: MLogo })

    .add('Default', () => ({
        ...wrapper,
        template: '<MLogo />'
    }))

    .add('Default Inline', () => ({
        ...wrapper,
        template: '<MLogo type="default-inline" />'
    }))

    .add('White', () => ({
        ...wrapper,
        template: '<MLogo type="white" />'
    }))

    .add('White Inline', () => ({
        ...wrapper,
        template: '<MLogo type="white-inline" />'
    }))
