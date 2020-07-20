import { storiesOf } from '@storybook/vue'
import AList from './AList.vue'

const wrapper = {
    components: { AList }
}

storiesOf('Atoms/List', module)
    .add('Vertical with chips (default)', () => ({
        ...wrapper,
        template: '<AList :items="items"></AList>',
        data() {
            return {
                items: ['coucou', 'banane', 'yeah']
            }
        }
    }))

    .add('Vertical without chips', () => ({
        ...wrapper,
        template: '<AList :items="items" :withoutChips="false"></AList>',
        data() {
            return {
                items: ['Ohohoh', 'Tu sens mauvais', 'yeah']
            }
        }
    }))

    .add('Horizontal with chips', () => ({
        ...wrapper,
        template: `<AList :items="items" :horizontal="true"></AList>`,
        data() {
            return {
                items: ['Ohoho', 'Horizontal', 'avec puces']
            }
        }
    }))

    .add('Vertical, no chips, no padding', () => ({
        ...wrapper,
        template: '<AList :items="items" withoutChips noPadding></AList>',
        data() {
            return {
                items: ['Ohohoh', 'Qui es là ?', 'ton cul']
            }
        }
    }))

    .add('Horizontal without chips', () => ({
        ...wrapper,
        template: `<AList :items="items" :withoutChips="false" :horizontal="true"></AList>`,
        data() {
            return {
                items: ['Ohoho', 'Horizontal', 'sans puces']
            }
        }
    }))
