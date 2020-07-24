import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, optionsKnob as options, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import AButton from './AButton.vue'

storiesOf('Atoms', module)
    .addDecorator(withKnobs)
    .addParameters({ component: AButton })

    .add('Button', () => ({
        components: { AButton },

        props: {
            message: {
                type: String,
                default: text('Message', 'Le LamaBouton ❤')
            },

            state: {
                type: String,
                default: options(
                    'State',
                    { 'No state': null, Success: 'success', Warning: 'warning', Error: 'error' },
                    null,
                    { display: 'radio' }
                )
            },

            styles: {
                type: String,
                default: options(
                    'Styles',
                    { 'No styles': null, Light: 'light', Dark: 'dark' },
                    null,
                    { display: 'radio' }
                )
            },

            disabled: {
                type: Boolean,
                default: boolean('Disabled', false)
            }
        },

        template: `
            <AButton
                :state="state"
                :styles="styles"
                :disabled="disabled"
                @click="action"
            >
                {{ message }}
            </AButton>
        `,

        methods: { action: action('AButton clicked') }
    }))
