import { storiesOf } from '@storybook/vue'
import APartner from './APartner.vue'

const wrapper = {
    components: { APartner }
}

storiesOf('Atoms/Partner', module).add(
    'Default',
    () => ({
        ...wrapper,
        template:
            '<APartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />'
    }),
)
