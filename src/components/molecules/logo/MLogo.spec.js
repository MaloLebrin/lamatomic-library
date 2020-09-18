import { shallowMount } from '@vue/test-utils'
import MLogo from './MLogo.vue'

describe('Molecule - MLogo', () => {
    test('...has <alink> component and logo class', () => {
        const wrapper = shallowMount(MLogo)

        expect(wrapper.html()).toContain(`<alink`)

        expect(wrapper.html()).toContain(`class="m-logo"`)
    })

    test('...has AImage logo when src != null', () => {
        const wrapper = shallowMount(MLogo, {
            propsData: {
                src: 'http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg'
            }
        })
        expect(wrapper.html()).toContain(`<alink`)
        expect(wrapper.html()).toContain(`<aimage-stub src="http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg"`)

        expect(wrapper.html()).toContain(`class="m-logo"`)
    })

    test('...has slot working & nnot Aimage', () => {
        const wrapper = shallowMount(MLogo, {
            slots: {
                default: 'logo SVG'
            }
        })
        expect(wrapper.html()).toContain(`<alink`)
        expect(wrapper.html()).toContain(`logo SVG`)
        expect(wrapper.html()).not.toContain(`<aimage-stub src="http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg"`)

        expect(wrapper.html()).toContain(`class="m-logo"`)
    })

})
