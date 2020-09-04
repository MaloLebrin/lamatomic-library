import { storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MCard from './MCard.vue'

const wrapper = {
    components: { MCard }
}

storiesOf('Molecules/Card', module)
    .addDecorator(withKnobs)
    .addParameters({ component: MCard })

    .add('Cards',() => ({
        components: { MCard },

        props: {
            to: {
                type: String,
                default: text('to', null)
            },

            href: {
                type: String,
                default: text('href', null)
            },

            slot: {
                type: String,
                default: text('Icon name', 'Lamacaaaaaard')
            },

            isLink: {
                type: Boolean,
                default: boolean('Link ?', false)
            },

            noAnim: {
                type: Boolean,
                default: boolean('Without anim', false)
            },
        },

        template:
            `
            <MCard
                :to="to"
                :href="href"
                :isLink="isLink"
                :noAnim="noAnim"
                @click="action"
            >
                {{ slot }}
            </MCard>
            `,

        methods: { action: action('AMCard clicked') },


        }),
        { info: true }
    )
