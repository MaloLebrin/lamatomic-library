import { mount } from '@vue/test-utils'
import MCarousel from './MCarousel.vue'
import AImage from '@/components/atoms/image/AImage.vue'
import { getMountedComponent } from '@/utils'


describe('Molecule - MCarousel', () => {
    test('... as default', () => {
        const wrapper = mount( MCarousel )
        expect(wrapper.html()).toContain('<div class="VueCarousel"')
    })
    test('... array of component in slides', () => {
        const image1 = getMountedComponent(AImage,
            { src: require("../logo/svg/logo-white-inline.svg")}, 
            { alt: "logodefault"}
       )
       const slides = [image1]

       const wrapper = mount( MCarousel, {
            propsData: {
                slides
            }
       })
       expect(wrapper.html()).toContain('<div data-v-438fd353="" role="tablist" class="VueCarousel-dot-container" style="margin-top: 20px;"></div>')
    })
})
