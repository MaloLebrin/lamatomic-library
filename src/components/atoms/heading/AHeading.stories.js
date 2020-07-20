import { storiesOf } from '@storybook/vue'
import AHeading from './AHeading.vue'

const wrapper = {
    components: { AHeading }
}

storiesOf('Atoms/Heading', module)
    .add('H1', () => ({
        ...wrapper,
        template: '<AHeading :level="1">Hello h1</AHeading>'
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

    .add('Italic', () => ({
        ...wrapper,
        template:
            '<AHeading italic>Mon super titre en italic (ça claque !)</AHeading>'
    }))

storiesOf('Atoms/Heading/Align', module)
    .add('Left', () => ({
        ...wrapper,
        template: `
            <AHeading align="left">
                Lorem ipsum dolor sit amet
            </AHeading>`
    }))

    .add('Center', () => ({
        ...wrapper,
        template: `
            <AHeading align="center">
                Lorem ipsum dolor sit amet
            </AHeading>`
    }))

    .add('Right', () => ({
        ...wrapper,
        template: `
            <AHeading align="right">
                Lorem ipsum dolor sit amet
            </AHeading>`
    }))

    .add('Justify', () => ({
        ...wrapper,
        template: `
            <AHeading align="justify">
                Lorem ipsum dolor sit amet
            </AHeading>`
    }))

storiesOf('Atoms/Heading/Weight', module)
    .add('Thin', () => ({
        ...wrapper,
        template: `
            <AHeading weight="thin">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Normal', () => ({
        ...wrapper,
        template: `
            <AHeading weight="normal">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Bold', () => ({
        ...wrapper,
        template: `
            <AHeading weight="bold">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Bolder', () => ({
        ...wrapper,
        template: `
            <AHeading weight="bolder">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

storiesOf('Atoms/Heading/Decoration', module)
    .add('No Decoration', () => ({
        ...wrapper,
        template: `
            <AHeading decoration="no-decoration">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Blink', () => ({
        ...wrapper,
        template: `
            <AHeading decoration="blink">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Dashed', () => ({
        ...wrapper,
        template: `
            <AHeading decoration="dashed">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Dotted', () => ({
        ...wrapper,
        template: `
            <AHeading decoration="dotted">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Double', () => ({
        ...wrapper,
        template: `
            <AHeading decoration="double">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

    .add('Underline', () => ({
        ...wrapper,
        template: `
            <AHeading decoration="underline">
                Oh yeah I love bananas 💛
            </AHeading>`
    }))

