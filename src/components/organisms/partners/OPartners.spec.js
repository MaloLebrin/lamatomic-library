import { mount } from '@vue/test-utils'
import OPartners from './OPartners.vue'


describe('Organism - OPartners', () => {
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
        const wrapper = mount( OPartners )
        expect(wrapper.html()).toContain(`<div class="o-partners">`)
    })
})
