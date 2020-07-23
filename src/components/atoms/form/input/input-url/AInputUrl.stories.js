import { storiesOf } from '@storybook/vue'
import AInputUrl from './AInputUrl.vue'

const wrapper = {
    components: { AInputUrl }
}

storiesOf('Atoms/Form/Inputs/Url', module)
    .add('Default', () => ({
        ...wrapper,
        template:
            '<AInputUrl name="your-url" placeholder="Veuillez renseigner une jolie URL"/>'
    }))

    .add('With URL verification', () => ({
        ...wrapper,
        template:
            '<AInputUrl name="your-url" placeholder="Veuillez renseigner une jolie URL" checkValidity />'
    }))
