import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
import Picture from './Picture.vue'

// export default { title: 'Atomes/Pictures' }

// export const PictureLamaSrcLien = () => ({
//     components: { Picture },
//     template:
//         '<Picture src="https://pixnio.com/free-images/2017/11/10/2017-11-10-20-55-30-1200x800.jpg" title="Une super Picture de Lama" alt="un lama super">Lama</Picture>'
// })

const wrapper = {
    components: { Picture }
}

storiesOf('Atomes/Picture', module)
    // .addDecorator(withInfo)
    .add(
        'Défaut',
        () => ({
            ...wrapper,
            template:
                '<Picture src="https://pixnio.com/free-images/2017/11/10/2017-11-10-20-55-30-1200x800.jpg" title="Une super Picture de Lama" alt="un lama super">Lama</Picture>'
        }),
        { info: true }
    )
