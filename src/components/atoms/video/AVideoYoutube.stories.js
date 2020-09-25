import { storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean, optionsKnob as options } from '@storybook/addon-knobs'

import AVideo from './AVideo.vue'

storiesOf('Atoms', module)
    .addDecorator(withKnobs)
    .addParameters({ component: AVideo })

    .add('video',() => ({
        components: { AVideo },

        props: {
            lamatitle: {
                type: String,
                default: text('Message', 'Le LamaBouton ❤')
            },

            src: {
                type: String,
                default: text('src link', 'https://youtu.be/DkXhSAW5pTQ')
            },

            lamaalt : {
                type: String,
                default: text('alt', 'lamaalt')
            },

            autoplay: {
                type: Boolean,
                default: boolean('Autoplay', false)
            },

            controls: {
                type: Boolean,
                default: boolean('Control', false)
            },

            loop: {
                type: Boolean,
                default: boolean('Loop', false)
            },

            muted: {
                type: Boolean,
                default: boolean('Muted', false)
            },

            poster: {
                type: String,
                default: text('vignette', '')
            },

            preload: {
                type: String,
                default: options(
                    'preload',
                    { none: 'none', metadata: 'metadata', auto: 'auto' },
                    null,
                    { display: 'radio' }
                )

            }
        },


        template:
            `<AVideo />`
        }),
        { info: true }
    )
