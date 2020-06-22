import { storiesOf } from '@storybook/vue'
import APicture from './APicture.vue'

const wrapper = {
    components: { APicture }
}

storiesOf('Atoms/Picture', module).add('Default', () => ({
    ...wrapper,
    template:
        '<APicture src="https://pixnio.com/free-images/2017/11/10/2017-11-10-20-55-30-1200x800.jpg" title="Une super APicture de Lama" alt="un lama super" />'
}))
