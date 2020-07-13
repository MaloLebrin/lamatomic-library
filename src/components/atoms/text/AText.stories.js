import { storiesOf } from '@storybook/vue'
import AText from './AText.vue'

const wrapper = {
    components: { AText }
}

storiesOf('Atoms/Text', module)
    .add('Default', () => ({
        ...wrapper,
        template: '<AText>Mon super texte dans une balise p</AText>'
    }))

    .add('Span', () => ({
        ...wrapper,
        template: '<AText span>Mon super texte dans une balise span</AText>'
    }))

    .add('Italic', () => ({
        ...wrapper,
        template:
            '<AText italic>Mon super texte en italic (ça swingue !)</AText>'
    }))

storiesOf('Atoms/Text/Align', module)
    .add('Left', () => ({
        ...wrapper,
        template: `
            <AText align="left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AText>`
    }))

    .add('Center', () => ({
        ...wrapper,
        template: `
            <AText align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AText>`
    }))

    .add('Right', () => ({
        ...wrapper,
        template: `
            <AText align="right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AText>`
    }))

    .add('Justify', () => ({
        ...wrapper,
        template: `
            <AText align="justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AText>`
    }))

storiesOf('Atoms/Text/Weight', module)
    .add('Thin', () => ({
        ...wrapper,
        template: `
            <AText weight="thin">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Normal', () => ({
        ...wrapper,
        template: `
            <AText weight="normal">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Bold', () => ({
        ...wrapper,
        template: `
            <AText weight="bold">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Bolder', () => ({
        ...wrapper,
        template: `
            <AText weight="bolder">
                Oh yeah I love bananas 💛
            </AText>`
    }))

storiesOf('Atoms/Text/Decoration', module)
    .add('No Decoration', () => ({
        ...wrapper,
        template: `
            <AText decoration="no-decoration">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Blink', () => ({
        ...wrapper,
        template: `
            <AText decoration="blink">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Dashed', () => ({
        ...wrapper,
        template: `
            <AText decoration="dashed">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Dotted', () => ({
        ...wrapper,
        template: `
            <AText decoration="dotted">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Double', () => ({
        ...wrapper,
        template: `
            <AText decoration="double">
                Oh yeah I love bananas 💛
            </AText>`
    }))

    .add('Underline', () => ({
        ...wrapper,
        template: `
            <AText decoration="underline">
                Oh yeah I love bananas 💛
            </AText>`
    }))
