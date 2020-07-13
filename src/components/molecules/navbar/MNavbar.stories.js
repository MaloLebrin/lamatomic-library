import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { MNavbar, AButton, ALink } from '@/entry'

const wrapper = {
    components: { MNavbar }
}

const link1 = getMountedComponent(
    ALink,
    { href: 'https://bananas.com/' },
    { default: 'Our Bananas' }
)
const btn1 = getMountedComponent(AButton, { state: 'success' }, { default: 'Buy now!'})
const btn2 = getMountedComponent(AButton, { state: 'warning' }, { default: 'Join ours bananas 🍌'})

const items = [link1, btn1, btn2]

storiesOf('Molecules/Navbar', module)
    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: '<MNavbar :items="items" />'
    }))

    .add('Vertical', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: '<MNavbar :items="items" :horizontal="false" />'
    }))
