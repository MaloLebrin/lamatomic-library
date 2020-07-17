import { storiesOf } from '@storybook/vue'
import MPartners from './MPartners.vue'

const wrapper = {
    components: { MPartners }
}

storiesOf('Atoms/Partner', module).add(
    'Default',
    () => ({
        ...wrapper,
        template:
            '<MPartners src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />'
    }),
)
