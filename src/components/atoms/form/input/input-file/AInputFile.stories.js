import { storiesOf } from '@storybook/vue'
import AInputFile from './AInputFile.vue'

const wrapper = {
    components: { AInputFile }
}

storiesOf('Atoms/Form/Inputs', module)
    .addParameters({ component: AInputFile })

    .add('File',() => ({
            ...wrapper,
            template: '<AInputFile />'
        }),
    )
