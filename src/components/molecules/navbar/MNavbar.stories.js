import { storiesOf } from '@storybook/vue'
import ALink from '../../atoms/link/ALink.vue'
import MNavbar from './MNavbar.vue'
const wrapper = {
    components: { MNavbar }
}

storiesOf('Molecules/Navbar', module)

    .add(' default', () => ({
        ...wrapper,
        template: '<MNavbar :items="items" />',
        data () {
            return {
                items: ['<AButton>', ALink, ALink ]
            }
        }
    }))