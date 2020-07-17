import { storiesOf } from '@storybook/vue'
import AInputSearch from './AInputSearch.vue'
const wrapper = {
    components: { AInputSearch }
}

storiesOf('Atoms/Inputs', module).add('Search', () => ({
    ...wrapper,
    template: `<AInputSearch />`
}))
