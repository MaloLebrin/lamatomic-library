import { storiesOf } from '@storybook/vue'
import Picture from './Picture.vue'

const wrapper = {
    components: { Picture }
}

storiesOf('Atomes/Picture', module).add(
    'Défaut',
    () => ({
        ...wrapper,
        template:
            '<Picture src="https://pixnio.com/free-images/2017/11/10/2017-11-10-20-55-30-1200x800.jpg" title="Une super Picture de Lama" alt="un lama super" />'
    }),
    { info: true }
)
