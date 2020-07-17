import { mount } from '@vue/test-utils'
import MPartner from './MPartner.vue'

describe('Molecule - MPartner', () => {
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
        const wrapper = mount(MPartner)
        expect(wrapper.html()).toContain(
            `<a title="Partner s logo" class="link m-partner">`
        )
    })
})
