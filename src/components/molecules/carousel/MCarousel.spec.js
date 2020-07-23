import { mount } from '@vue/test-utils'
import MCarousel from './MCarousel.vue'
import AImage from '@/components/atoms/image/AImage.vue'
import { getMountedComponent } from '@/utils'

describe('Molecule - MCarousel', () => {
    test('...has default <div>', () => {
        const wrapper = mount( MCarousel )

        expect(wrapper.html()).toContain('<div class="VueCarousel m-carousel')
    })

    test('...array of component in slides', () => {
        const image1 = getMountedComponent(AImage,
            { src: '../logo/svg/logo-white-inline.svg' },
            { alt: 'logodefault' }
        )

       const slides = [image1]

       const wrapper = mount( MCarousel, {
            propsData: {
                slides
            }
       })

       expect(wrapper.html()).toContain('<div class="VueCarousel-wrapper">')
       expect(wrapper.html()).toContain('<div class="VueCarousel-inner" style="transform: translate(0px, 0); transition: 0.5s ease transform; flex-basis: 0px; visibility: hidden; height: auto;">')
    })
})
