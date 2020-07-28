import { storiesOf } from '@storybook/vue'
import AText from '@/components/atoms/text/AText.vue'
import AHeading from './AHeading.vue'

const wrapper = {
    components: { AHeading, AText }
}

storiesOf('Atoms/Heading', module)
    .addParameters({ component: AHeading })
    .add('Levels', () => ({
        ...wrapper,
        template: `
            <div>
                <AHeading level="1">Hello h1</AHeading>
                <AHeading level="2">Hello h2</AHeading>
                <AHeading level="3">Hello h3</AHeading>
                <AHeading level="4">Hello h4</AHeading>
                <AHeading level="5">Hello h5</AHeading>
                <AHeading level="6">Hello h6</AHeading>
            </div>
        `
    }))

    .add('Italic', () => ({
        ...wrapper,
        template:
            '<AHeading italic>Title in italic</AHeading>'
    }))

    .add('Align', () => ({
        ...wrapper,
        template: `
            <div>
                <AHeading align="left">
                    Title left align
                </AHeading>
                <AHeading align="center">
                    Title center align
                </AHeading>
                <AHeading align="right">
                    Title right align
                </AHeading>
                <AHeading align="justify">
                    Title justify align
                </AHeading>
            </div>
        `
    }))

    .add('Weight', () => ({
        ...wrapper,
        template: `
            <div>
                <AHeading weight="thin">
                    Title thin weight
                </AHeading>
                <AHeading weight="normal">
                    Title normal weight
                </AHeading>
                <AHeading weight="bold">
                    Title bold weight
                </AHeading>
                <AHeading weight="bolder">
                    Title bolder weight
                </AHeading>
            </div>
        `
    }))

    .add('Decoration', () => ({
        ...wrapper,
        template: `
            <div>
                <AHeading decoration="no-decoration">
                    Title no-decoration
                </AHeading>
                <AHeading decoration="blink">
                    Title blink decoration
                </AHeading>
                <AHeading decoration="dashed">
                    Title dashed decoration
                </AHeading>
                <AHeading decoration="dotted">
                    Title dotted decoration
                </AHeading>
                <AHeading decoration="double">
                    Title double decoration
                </AHeading>
                <AHeading decoration="underline">
                    Title underline decoration
                </AHeading>
            </div>
        `
    }))

