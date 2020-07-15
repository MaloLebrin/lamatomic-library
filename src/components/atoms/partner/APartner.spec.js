import { mount } from '@vue/test-utils'
import APartner from './APartner.vue'

describe('Molecule - APartner', () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          value: jest.fn(() => {
            return {
              matches: true,
              addListener: jest.fn(),
              removeListener: jest.fn()
            };
          })
        });
      });
    test('...has <alink> component and partner class', () => {
        const wrapper = mount(APartner)
        expect(wrapper.html()).toContain(
            `<a class="link partner">`
        )
    })
    // test('... array of component in slides', () => {
    //     const image1 = getMountedComponent(AImage,
    //         { src: require("../logo/svg/logo-white-inline.svg")}, 
    //         { alt: "logodefault"}
    //    )
    //    const slides = [image1]

    //    const wrapper = mount( MCarousel, {
    //         propsData: {
    //             slides
    //         }
    //    })
    //    expect(wrapper.html()).toContain('<div data-v-438fd353="" role="tablist" class="VueCarousel-dot-container" style="margin-top: 20px;"></div>')
    // })
})