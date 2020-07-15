import { storiesOf } from '@storybook/vue'
import { getMountedComponent } from '@/utils'
import { MPartners } from '@/entry'
import APartner from '@/components/atoms/partner/APartner.vue'

const wrapper = {
    components: { MPartners }
}

const img1 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/bge.png') }, { title: 'Bge'})
const img2 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/france-active.png') }, { title: 'france active 🍌'})
const img3 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/ij-logo.png') }, { title: 'ij logo 🍌'})
const img4 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/la-cantine.png') }, { title: 'Join ours bananas 🍌'})
const img5 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/maia-mater.png') }, { title: 'Join ours bananas 🍌'})
const img6 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/MashUp.png') }, { title: 'Join ours bananas 🍌'})
const img7 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/Nantestech.png') }, { title: 'Join ours bananas 🍌'})
const img8 = getMountedComponent(APartner, { src:require('@/components/molecules/partners/img/pepite.png') }, { title: 'Join ours bananas 🍌'})

const items = [img1, img2, img3, img4, img5, img6, img7, img8]

storiesOf('Molecules/Partners', module)
    .add('Default', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: `<MPartners :items="items"  />`
    }))

    .add('Vertical', () => ({
        ...wrapper,
        data() {
            return {
                items
            }
        },
        template: '<MPartners :items="items" :horizontal="false" />'
    }))
