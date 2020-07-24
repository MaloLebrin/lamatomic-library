import { mount } from '@vue/test-utils'
import MPartner from './MPartner.vue'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
})

describe('Molecule - MPartner', () => {
    test('...has <a> component and partner class', () => {
        const wrapper = mount(MPartner)
        expect(wrapper.html()).toContain(
            `<a title="Partner's logo" class="a-link m-partner">`
        )
    })
})
