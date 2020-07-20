import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { OHeader, AButton, ALink } from '@/entry'

const wrapper = {
    components: { OHeader }
}

const link1 = getMountedComponent(
    ALink,
    { href: 'https://bananas.com/' },
    { default: 'je suis unn cabinet' }
)
const btn1 = getMountedComponent(AButton, { state: 'success' }, { default: 'Buy now!'})
const btn2 = getMountedComponent(AButton, { state: 'warning' }, { default: 'Join ours bananas 🍌'})

const items = [link1, btn1, btn2]

storiesOf('Organisms/Header', module)
    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: '<OHeader :items="items" />'
    }))

    .add('Mobile', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: '<OHeader :items="items" IsOpen />'
    }))
