import { storiesOf } from '@storybook/vue'
import AHeading from './AHeading.vue'

const wrapper = {
    components: { AHeading }
}

storiesOf('Atomes/Heading', module)
    .add('H1', () => ({
        ...wrapper,
        template: '<AHeading level="1">Hello h1</AHeading>'
    }))

    .add('H2', () => ({
        ...wrapper,
        template: '<AHeading level="2">Hello h2</AHeading>'
    }))

    .add('H3', () => ({
        ...wrapper,
        template: '<AHeading level="3">Hello h3</AHeading>'
    }))

    .add('H4', () => ({
        ...wrapper,
        template: '<AHeading level="4">Hello h4</AHeading>'
    }))

    .add('H5', () => ({
        ...wrapper,
        template: '<AHeading level="5">Hello h5</AHeading>'
    }))

    .add('H6', () => ({
        ...wrapper,
        template: '<AHeading level="6">Hello h6</AHeading>'
    }))
