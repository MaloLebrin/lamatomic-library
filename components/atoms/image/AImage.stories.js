import { storiesOf } from '@storybook/vue'
import AImage from './AImage.vue'

const wrapper = {
    components: { AImage }
}

storiesOf('Atomes/AImage', module).add(
    'Défaut',
    () => ({
        ...wrapper,
        template:
            '<AImage src="https://pixnio.com/free-images/2017/11/10/2017-11-10-20-55-30-1200x800.jpg" title="Une super AImage de Lama" alt="un lama super" />'
    }),
    { info: true }
)
