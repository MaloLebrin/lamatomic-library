import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import AButton from './AButton.vue'

const wrapper = {
    components: { AButton }
}

storiesOf('Atomes/Boutons', module)
    // .addDecorator(withInfo)
    .add(
        'Défaut',
        () => ({
            ...wrapper,
            template: '<AButton>Le LamaBouton ❤</AButton>'
        }),
        { info: true }
    )
    .add(
        'Succès',
        () => ({
            ...wrapper,
            template: '<AButton success>Kiwi 🥝</AButton>'
        }),
        { info: true }
    )
    .add(
        'Erreur',
        () => ({
            ...wrapper,
            template:
                "<AButton error>Framboise 🍓 (mais c'est une fraise 😲)</AButton>"
        }),
        { info: true }
    )
    .add(
        'Warning',
        () => ({
            ...wrapper,
            template: '<AButton warning>Banane 🍌</AButton>'
        }),
        { info: true }
    )
    .add(
        'Désactivé',
        () => ({
            ...wrapper,
            template: '<AButton disabled>Trop jeune désolé 🔞</AButton>'
        }),
        { info: true }
    )
    .add(
        'Blanc',
        () => ({
            ...wrapper,
            template: '<AButton white>Banane</AButton>'
        }),
        { info: true }
    )
    .add(
        'Noir',
        () => ({
            ...wrapper,
            template: '<AButton black>Banane</AButton>'
        }),
        { info: true }
    )
    .add(
        'Lien Externe',
        () => ({
            ...wrapper,
            template:
                '<AButton href="https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/3/9/9/399584ebc7_50163211_lama-coronavirus.jpg">Un beau lama 🦙</AButton>'
        }),
        { info: true }
    )
    .add(
        'Lien Interne',
        () => ({
            ...wrapper,
            template: `<AButton to="/contact">Contact ☎</AButton>`
        }),
        { info: true }
    )
    .add(
        'Evènement au clic',
        () => ({
            ...wrapper,
            template: '<AButton @click="action">Banane</AButton>',
            methods: { action: action('AButton clicked') }
        }),
        { info: true }
    )
