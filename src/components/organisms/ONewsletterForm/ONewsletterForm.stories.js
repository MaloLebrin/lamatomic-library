import { storiesOf } from '@storybook/vue'
import ONewsletterForm from './ONewsletterForm.vue'

const wrapper = {
    components: { ONewsletterForm }
}

storiesOf('Organisms/Newsletter', module)
    .add('Default', () => ({
        ...wrapper,
        template: '<ONewsletterForm />'
    }))

    .add('without image', () => ({
        ...wrapper,
        template: '<ONewsletterForm :withoutImage="true"/>'
    }))
    .add('without Title', () => ({
        ...wrapper,
        template: '<ONewsletterForm :withoutTitle="true"/>'
    }))

