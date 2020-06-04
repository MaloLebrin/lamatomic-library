import { storiesOf } from '@storybook/vue'
import List from './List.vue'

const wrapper = {
    components: { List }
}

storiesOf('Atomes/List', module)
    // .addDecorator(withInfo)
    .add(
        'Défaut',
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
        'Sans décoration',
        () => ({
            ...wrapper,
            template: '<List :items="items" :decoration="false"></List>',
            data() {
                return {
                    items: ['Ohohoh', 'Tu sens mauvais', 'yeah']
                }
            }
        }),
        { info: true }
    )
