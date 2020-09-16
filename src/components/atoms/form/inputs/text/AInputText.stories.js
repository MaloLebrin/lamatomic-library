import { storiesOf } from '@storybook/vue'
import AInputText from './AInputText.vue'

const wrapper = {
    components: { AInputText }
}

storiesOf('Atoms/Form/Inputs', module)
    .addParameters({ component: AInputText })

    .add('Text',
        () => ({
            ...wrapper,
            template: '<div><AInputText name="my-text" v-model="firstname" /> {{ firstname }}</div>',
            data () {
                return {
                    firstname: '',
                }
            }

        })
    )
