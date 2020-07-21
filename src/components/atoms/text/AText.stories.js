import { storiesOf } from '@storybook/vue'
import AText from './AText.vue'

const wrapper = {
    components: { AText }
}

storiesOf('Atoms/Text', module)
    .add('p, span, italic', () => ({
        ...wrapper,
        template: `
            <div>
                <AText>Mon super texte dans une balise p</AText>
                <AText span>Mon super texte dans une balise span</AText>
                <AText italic>Mon super texte en italic (ça swingue !)</AText>
            </div>
        `
    }))

    .add('Align', () => ({
        ...wrapper,
        template: `
            <div>
                <AText weight="bold">Mon texte aligné à gauche</AText>
                <AText align="left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AText>
                <AText align="center" weight="bold">Mon texte centré</AText>
                <AText align="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AText>
                <AText align="right" weight="bold">Mon texte aligné à droite</AText>
                <AText align="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AText>
                <AText align="justify" weight="bold">Mon texte justifié</AText>
                <AText align="justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AText>
            </div>
        `
    }))

    .add('Weight', () => ({
        ...wrapper,
        template: `
            <div>
                <AText weight="thin">
                    Title thin weight
                </AText>
                <AText weight="normal">
                    Title normal weight
                </AText>
                <AText weight="bold">
                    Title bold weight
                </AText>
                <AText weight="bolder">
                    Title bolder weight
                </AText>
            </div>
        `
    }))

    .add('Decoration', () => ({
        ...wrapper,
        template: `
            <div>
                <AText decoration="no-decoration">
                    Title no-decoration
                </AText>
                <AText decoration="blink">
                    Title blink decoration
                </AText>
                <AText decoration="dashed">
                    Title dashed decoration
                </AText>
                <AText decoration="dotted">
                    Title dotted decoration
                </AText>
                <AText decoration="double">
                    Title double decoration
                </AText>
                <AText decoration="underline">
                    Title underline decoration
                </AText>
            </div>
        `
    }))
