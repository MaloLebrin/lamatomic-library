import { storiesOf } from '@storybook/vue'
import AList from './AList.vue'

const wrapper = {
    components: { AList }
}

storiesOf('Atoms/List', module)
    .addParameters({ component: AList})

    .add('Vertical with chips (default)', () => ({
        ...wrapper,
        template: '<AList :items="items"></AList>',
        data() {
            return {
                items: ['Lapin 🐇', 'Banane 🍌', 'Papier toilette 🧻']
            }
        }
    }))

    .add('Vertical without chips', () => ({
        ...wrapper,
        template: '<AList :items="items" withoutChips></AList>',
        data() {
            return {
                items: ['Hérisson 🦔', 'Pique ♠', 'Kamoulox 💩']
            }
        }
    }))

    .add('Vertical, no chips, no padding', () => ({
        ...wrapper,
        template: '<AList :items="items" withoutChips noPadding></AList>',
        data() {
            return {
                items: ['Ohohoh', 'Héhéhé', 'Hihihi']
            }
        }
    }))

    .add('Horizontal with chips', () => ({
        ...wrapper,
        template: `<AList :items="items" horizontal></AList>`,
        data() {
            return {
                items: ['Poisson 🐠', 'Rouge 🟥', 'La mer 🌊', 'Coquillage 🐚']
            }
        }
    }))

    .add('Horizontal without chips', () => ({
        ...wrapper,
        template: `<AList :items="items" horizontal withoutChips></AList>`,
        data() {
            return {
                items: ['Evènement 📅', 'Contact 📞', 'Protection 😷']
            }
        }
    }))

    .add('Horizontal, no chips, no padding', () => ({
        ...wrapper,
        template: `<AList :items="items" horizontal withoutChips noPadding></AList>`,
        data() {
            return {
                items: ['Concert 🎙', 'Evènement 📅', 'Contact 📞', 'Protection 😷']
            }
        }
    }))
