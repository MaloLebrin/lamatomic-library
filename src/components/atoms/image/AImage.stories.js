import { storiesOf } from '@storybook/vue'
import AImage from './AImage.vue'

const wrapper = {
    components: { AImage }
}

storiesOf('Atoms/Image', module).add(
    'Default',
    () => ({
        ...wrapper,
        template:
            '<AImage src="https://placehold.it/350x150" title="Une super AImage de Lama" alt="un lama super" />'
    }),
    { info: true }
)
