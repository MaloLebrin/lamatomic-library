import { storiesOf } from '@storybook/vue'
import List from './List.vue'

const wrapper = {
    components: { List }
}

storiesOf('Atomes/List', module)
    .add(
        'vertical avec puces (default)',
        () => ({
            ...wrapper,
            template: '<List :items="items"></List>',
            data() {
                return {
                    items: ['coucou', 'banane', 'yeah']
                }
            }
        }),
        { info: true }
    )

    .add(
        'Without Chips',
        () => ({
            ...wrapper,
            template: '<List :items="items" :withoutChips="false"></List>',
            data() {
                return {
                    items: ['Ohohoh', 'Tu sens mauvais', 'yeah']
                }
            }
        }),
        { info: true }
    )
    .add(
        'Horizontal',
        () => ({
            ...wrapper,
            template: `<list :items="items" :horizontal="true"></List>`,
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
            template: `<List :items="items" :withoutChips="false" :horizontal="true"></List>`,
            data() {
                return {
                    items: ['Ohoho', 'Horizontal', 'sans puces']
                }
            }
        }),
        { info: true }
    )
