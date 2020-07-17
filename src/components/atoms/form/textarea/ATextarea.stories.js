import { storiesOf } from '@storybook/vue'
import ATextarea from './ATextarea.vue'
const wrapper = {
    components: { ATextarea }
}

storiesOf('Atoms/Form/Textarea', module).add('ATextarea', () => ({
    ...wrapper,
    template: '<ATextarea />'
}))
