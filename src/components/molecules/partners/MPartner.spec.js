import { mount } from '@vue/test-utils'
import MPartners from './MPartners.vue'


describe('Molecule - MPartners', () => {
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

    test('... as default', () => {
        const wrapper = mount( MPartners )
        expect(wrapper.html()).toContain(`<div class="partners">`)
    })
})
