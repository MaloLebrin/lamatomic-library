import { storiesOf } from '@storybook/vue'
import ATextarea from './ATextarea.vue'
const wrapper = {
    components: { ATextarea }
}

storiesOf('Atoms/ATextarea', module).add('ATextarea', () => ({
    ...wrapper,
    template: '<ATextarea />'
}))
