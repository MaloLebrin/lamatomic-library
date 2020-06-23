import { storiesOf } from '@storybook/vue'
// import { action } from '@storybook/addon-actions'
import MLogo from './MLogo.vue'

const wrapper = {
    components: { MLogo }
}

storiesOf('Molecules/Logo', module)
    // .addDecorator(withInfo)
    .add(
        'Défaut',
        () => ({
            ...wrapper,
            template: '<MLogo/>'
        }),
        { info: true }
    )
