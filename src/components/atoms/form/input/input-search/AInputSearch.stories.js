import { storiesOf } from '@storybook/vue'
import AInputSearch from './AInputSearch.vue'

const wrapper = {
    components: { AInputSearch }
}

storiesOf('Atoms/Form/Inputs', module)
    .addParameters({ component: AInputSearch })

    .add('Search', () => ({
        ...wrapper,
        template: `<AInputSearch />`
    }))
