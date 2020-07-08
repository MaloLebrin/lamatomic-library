import { storiesOf } from '@storybook/vue'
import MNavbar from './MNavbar.vue'
const wrapper = {
    components: { MNavbar }
}


storiesOf('Molecules/Navbar', module)

    .add(' default hozizontal sans puces', () => ({
        ...wrapper,
        template: '<MNavbar />',

    }))
    .add(' Navbar footer lama compta', () => ({
        ...wrapper,
        template: '<MNavbar :horizontal="false" :footer="true" />',
    }))