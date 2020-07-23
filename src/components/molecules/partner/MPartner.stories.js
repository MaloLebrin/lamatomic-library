import { storiesOf } from '@storybook/vue'
import MPartner from './MPartner.vue'

const wrapper = {
    components: { MPartner }
}

storiesOf('Molecules/Partner', module)
    .addParameters({ component: MPartner })

    .add('Default',() => ({
            ...wrapper,
            template:
                '<MPartner src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />'
        }),
    )
