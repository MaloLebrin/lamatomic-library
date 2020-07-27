import { mount } from '@vue/test-utils'
import { ONewsletterForm } from '@/entry'

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
describe('Organism - ONewsletterForm', () => {
    test('...has h2 as default tag', () => {
        const wrapper = mount(ONewsletterForm)
        expect(wrapper.find('h2')).toBeTruthy()
        expect(wrapper.html()).toContain('<p')
        expect(wrapper.html()).toContain('<img')
        expect(wrapper.html()).toContain('<button')
        expect(wrapper.html()).toContain('<input')
    })

    test('...with title or not', () => {
        const wrapper = mount(ONewsletterForm, {
            propsData: {
                withoutImage: true,
                withoutTitle: true
            }
        })

        expect(wrapper.vm.withoutImage).toBeTruthy()
        expect(wrapper.find('without-image')).toBeTruthy()
        expect(wrapper.vm.withoutTitle).toBeTruthy()
        expect(wrapper.find('without-title')).toBeTruthy()
    })
})
