import { mount } from '@vue/test-utils'
import AImage from '@/components/atoms/image/AImage.vue'
import { getMountedComponent } from '@/utils'
import MCarousel from './MCarousel.vue'

describe('Molecule - MCarousel', () => {
    test('...has default <div>', () => {
        const wrapper = mount( MCarousel )

        expect(wrapper.html()).toContain('<div class="m-carousel">')
        expect(wrapper.html()).toContain('<div class="agile agile--no-nav-buttons"')
    })

    test('...with slides', () => {
        const image1 = getMountedComponent(AImage,
            { src: 'http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg' },
            { alt: 'logodefault' }
        )

        const slides = [image1]

        const wrapper = mount( MCarousel, {
            propsData: {
                slides
            }
        })

        expect(wrapper.html()).toContain('<div class="agile__list">')
        expect(wrapper.html()).toContain('<div class="agile__track"')
        expect(wrapper.html()).toContain('<div class="agile__slides')
        expect(wrapper.html()).toContain('<div class="slide agile__slide"')
        expect(wrapper.html()).toContain('http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg')
    })
})
