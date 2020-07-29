import { mount } from '@vue/test-utils'
import AImage from './AImage.vue'

describe('Atom - AImage', () => {
    test('...has <img> tag', () => {
        const wrapper = mount(AImage)
        expect(wrapper.find('img')).toBeTruthy()
        expect(wrapper.html()).toContain('class="a-image')
    })

    test('...with title', () => {
        const wrapper = mount(AImage, {
            propsData: {
                title: 'Lama vert'
            }
        })

        expect(wrapper.attributes('title')).toBe('Lama vert')
    })

    test('...with wrong file path for src', () => {
        const wrapper = mount(AImage, {
            propsData: {
                src: 'Lama rouge'
            }
        })

        expect(wrapper.attributes('src')).toBe('Lama rouge')
    })


    test('...with correct src', () => {
        const wrapper = mount(AImage, {
            propsData: {
                src: 'http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg'
            }
        })

        expect(wrapper.attributes('src')).toBe('http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg')
    })

    test('...with alt', () => {
        const wrapper = mount(AImage, {
            propsData: {
                alt: 'Lama jaune'
            }
        })

        expect(wrapper.attributes('alt')).toBe('Lama jaune')
    })
})
