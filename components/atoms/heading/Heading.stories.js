import { storiesOf } from '@storybook/vue'
import Heading from './Heading.vue'

const wrapper = {
    components: { Heading }
}
storiesOf('Atomes/Heading', module)
    .add(
        'H1 par default',
        () => ({
            ...wrapper,
            template: '<Heading level="1">Hello h1</Heading>'
        }),
        { info: true }
    )
    .add(
        'H2',
        () => ({
            ...wrapper,
            template: '<Heading level="2">Hello h2</Heading>'
        }),
        { info: true }
    )
    .add(
        'H3',
        () => ({
            ...wrapper,
            template: '<Heading level="3">Hello h3</Heading>'
        }),
        { info: true }
    )
    .add(
        'H4',
        () => ({
            ...wrapper,
            template: '<Heading level="4">Hello h4</Heading>'
        }),
        { info: true }
    )
    .add(
        'H5',
        () => ({
            ...wrapper,
            template: '<Heading level="5">Hello h5</Heading>'
        }),
        { info: true }
    )
    .add(
        'H6',
        () => ({
            ...wrapper,
            template: '<Heading level="6">Hello h6</Heading>'
        }),
        { info: true }
    )
