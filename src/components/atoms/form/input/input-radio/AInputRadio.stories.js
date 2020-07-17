import { storiesOf } from '@storybook/vue'
import AInputRadio from './AInputRadio.vue'
const wrapper = {
    components: { AInputRadio }
}

storiesOf('Atoms/Inputs', module).add('Radio', () => ({
    ...wrapper,
    template:
        '<AInputRadio class="input radio" :radio="radio" @change="onChange($event)"/>'
}))
