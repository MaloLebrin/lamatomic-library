import { storiesOf } from '@storybook/vue'
import MLogo from './MLogo.vue'

const wrapper = {
    components: { MLogo }
}


storiesOf('Molecules/Logo', module)
    .addParameters({ component: MLogo })

    .add('Default', () => ({
        ...wrapper,
        template: `<MLogo  />`,
    }))
