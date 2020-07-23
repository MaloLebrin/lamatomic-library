import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { OPartners, MPartner } from '@/entry'

const wrapper = {
    components: { OPartners }
}

const img1 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'Bge'})
const img2 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'france active 🍌'})
const img3 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'ij logo 🍌'})
const img4 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'Join ours bananas 🍌'})
const img5 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'Join ours bananas 🍌'})
const img6 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'Join ours bananas 🍌'})
const img7 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'Join ours bananas 🍌'})
const img8 = getMountedComponent(MPartner, { src: 'https://placehold.it/350x150' }, { title: 'Join ours bananas 🍌'})

const items = [img1, img2, img3, img4, img5, img6, img7, img8]

storiesOf('Organisms/Partners', module)
    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: `<OPartners :items="items"  />`
    }))

    .add('Vertical', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: '<OPartners :items="items" :horizontal="false" />'
    }))
