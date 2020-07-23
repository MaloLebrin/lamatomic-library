import { storiesOf } from '@storybook/vue'
import ATextarea from './ATextarea.vue'
const wrapper = {
    components: { ATextarea }
}

storiesOf('Atoms/Form/Textarea', module)
    .addParameters({ component: ATextarea })

    .add('ATextarea', () => ({
        ...wrapper,
        template: '<ATextarea />'
    }))
