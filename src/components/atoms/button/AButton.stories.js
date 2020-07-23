import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import AButton from './AButton.vue'

const wrapper = {
    components: { AButton }
}

storiesOf('Atoms/Button', module)
    .addParameters({ component: AButton })

    .add('Default', () => ({
        ...wrapper,
        template: `<AButton>Le LamaBouton ❤</AButton>`
    }))

    .add('Success', () => ({
        ...wrapper,
        template: `<AButton state="success">Kiwi 🥝</AButton>`
    }))

    .add('Error', () => ({
        ...wrapper,
        template: `<AButton state="error">Framboise 🍓 (mais c'est une fraise 😲)</AButton>`
    }))

    .add('Warning', () => ({
        ...wrapper,
        template: `<AButton state="warning">Banane 🍌</AButton>`
    }))

    .add('Disabled', () => ({
        ...wrapper,
        template: `<AButton disabled>Trop jeune désolé 🔞</AButton>`
    }))

    .add('White', () => ({
        ...wrapper,
        template: `<AButton styles="white">Banane</AButton>`
    }))

    .add('Black', () => ({
        ...wrapper,
        template: `<AButton styles="black">Banane</AButton>`
    }))

    .add('External Link', () => ({
        ...wrapper,
        template: `<AButton href="https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/3/9/9/399584ebc7_50163211_lama-coronavirus.jpg">
                Un beau lama 🦙
            </AButton>`
    }))

    .add('Internal Link', () => ({
        ...wrapper,
        template: `<AButton to="/contact">Contact ☎</AButton>`
    }))

    .add('Submit', () => ({
        ...wrapper,
        template: `<AButton href='#' type='submit'>Envoyer 🚀</AButton>`
    }))

    .add('Click Event', () => ({
        ...wrapper,
        template: '<AButton @click="action">Big Event 📅</AButton>',
        methods: { action: action('AButton clicked') }
    }))
