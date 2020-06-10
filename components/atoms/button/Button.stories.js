import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import Button from './Button.vue'

const wrapper = {
    components: { Button }
}

storiesOf('Atomes/Boutons', module)
    // .addDecorator(withInfo)
    .add(
        'Défaut',
        () => ({
            ...wrapper,
            template: '<Button>Le LamaBouton ❤</Button>'
        }),
        { info: true }
    )
    .add(
        'Succès',
        () => ({
            ...wrapper,
            template: '<Button state="success">Kiwi 🥝</Button>'
        }),
        { info: true }
    )
    .add(
        'Erreur',
        () => ({
            ...wrapper,
            template:
                "<Button state='error'>Framboise 🍓 (mais c'est une fraise 😲)</Button>"
        }),
        { info: true }
    )
    .add(
        'Warning',
        () => ({
            ...wrapper,
            template: '<Button state="warning">Banane 🍌</Button>'
        }),
        { info: true }
    )
    .add(
        'Désactivé',
        () => ({
            ...wrapper,
            template: '<Button disabled>Trop jeune désolé 🔞</Button>'
        }),
        { info: true }
    )
    .add(
        'Blanc',
        () => ({
            ...wrapper,
            template: '<Button styles="white">Banane</Button>'
        }),
        { info: true }
    )
    .add(
        'Noir',
        () => ({
            ...wrapper,
            template: '<Button styles="black">Banane</Button>'
        }),
        { info: true }
    )
    .add(
        'Lien Externe',
        () => ({
            ...wrapper,
            template:
                '<Button href="https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/3/9/9/399584ebc7_50163211_lama-coronavirus.jpg">Un beau lama 🦙</Button>'
        }),
        { info: true }
    )
    .add(
        'Lien Interne',
        () => ({
            ...wrapper,
            template: `<Button to="/contact">Contact ☎</Button>`
        }),
        { info: true }
    )
    .add(
        'Submit',
        () => ({
            ...wrapper,
            template: `<Button href='#' type='submit'>Envoyer -></Button>`
        }),
        { info: true }
    )
    .add(
        'Evènement au clic',
        () => ({
            ...wrapper,
            template: '<Button @click="action">Banane</Button>',
            methods: { action: action('button clicked') }
        }),
        { info: true }
    )
