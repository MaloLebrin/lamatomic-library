import { storiesOf } from '@storybook/vue'
import AList from './AList.vue'

const wrapper = {
    components: { AList }
}

storiesOf('Atomes/AList', module)
    .add(
        'Vertical avec puces (default)',
        () => ({
            ...wrapper,
            template: '<AList :items="items"></AList>',
            data() {
                return {
                    items: ['coucou', 'banane', 'yeah']
                }
            }
        }),
        { info: true }
    )

    .add(
        'Vertical sans puces',
        () => ({
            ...wrapper,
            template: '<AList :items="items" :withoutChips="false"></AList>',
            data() {
                return {
                    items: ['Ohohoh', 'Tu sens mauvais', 'yeah']
                }
            }
        }),
        { info: true }
    )
    .add(
        'Horizontal avec puces',
        () => ({
            ...wrapper,
            template: `<list :items="items" :horizontal="true"></AList>`,
            data() {
                return {
                    items: ['Ohoho', 'Horizontal', 'avec puces']
                }
            }
        }),
        { info: true }
    )
    .add(
        'horizontal sans puces',
        () => ({
            ...wrapper,
            template: `<AList :items="items" :withoutChips="false" :horizontal="true"></AList>`,
            data() {
                return {
                    items: ['Ohoho', 'Horizontal', 'sans puces']
                }
            }
        }),
        { info: true }
    )
