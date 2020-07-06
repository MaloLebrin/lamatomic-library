import { storiesOf } from '@storybook/vue'
import AText from './AText.vue'

const wrapper = {
    components: { AText }
}

storiesOf('Atoms/Text', module)
    .add(
        'Défaut',
        () => ({
            ...wrapper,
            template: '<AText>Mon super texte dans une balise p</AText>'
        }),
        { info: true }
    )

    .add(
        'span',
        () => ({
            ...wrapper,
            template: '<AText span>Mon super texte dans une balise span</AText>'
        }),
        { info: true }
    )

    .add(
        'align left',
        () => ({
            ...wrapper,
            template: `<AText align="left">    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AText>`
        }),
        { info: true }
    )

    .add(
        'align center',
        () => ({
            ...wrapper,
            template: `<AText align="center">    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AText>`
        }),
        { info: true }
    )

    .add(
        'align right',
        () => ({
            ...wrapper,
            template: `<AText align="right">    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AText>`
        }),
        { info: true }
    )

    .add(
        'align justify',
        () => ({
            ...wrapper,
            template: `<AText align="justify">    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AText>`
        }),
        { info: true }
    )

